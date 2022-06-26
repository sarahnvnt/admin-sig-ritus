import React, { useEffect, useState } from "react";
import TextArea from "../../components/fields/textarea/TextArea";
import TextField from "../../components/fields/textfield/TextField";
import { getCulture, getProvinces, updateCulture } from "../../redux/apiCalls";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./editritus.scss";
import app from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import FieldSelected from "../../components/fields/fieldselected/FieldSelected";

const EditRitus = () => {
  const [video, setVideo] = useState([]);
  const [image, setImage] = useState("");
  const [images, setImages] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [imagesUrls, setImagesUrls] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [culture, setCulture] = useState({});
  const location = useLocation();
  const [province, setProvince] = useState("");
  const id = location.pathname.split("/")[2];
  console.log(video);

  const dispatch = useDispatch();
  const { provinces } = useSelector((state) => state.provinces);

  useEffect(() => {
    getProvinces(dispatch);
    getCulture(id, setCulture);
    setImage("");
    setImages([]);
  }, [isSubmitting === false]);

  useEffect(() => {
    setProvince(culture.province?._id);
    setVideo(culture.video);
    setImageUrl(culture.img);
    setImagesUrls(culture.imgs);
  }, [culture.province, culture.video, culture.img, culture.imgs]);

  console.log(imagesUrls);

  const handleVideos = (e) => {
    setVideo(e.target.value.split(","));
  };

  const handleUpload = () => {
    return new Promise((resolve, reject) => {
      if (image) {
        let file = image;
        const fileName = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
            }
          },
          (error) => {
            reject();
          },
          async () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            await getDownloadURL(uploadTask.snapshot.ref).then(
              (downloadURL) => {
                resolve(downloadURL);
              }
            );
          }
        );
      } else {
        resolve("");
      }
    });
  };

  const handleUploads = () => {
    return new Promise((resolve, reject) => {
      if (images.length > 0) {
        var urlTemp = [];
        const promises = [];
        images.map((file) => {
          const fileName = new Date().getTime() + file.name;
          const storage = getStorage(app);
          const storageRef = ref(storage, fileName);
          const uploadTask = uploadBytesResumable(storageRef, file);

          // Register three observers:
          // 1. 'state_changed' observer, called any time the state changes
          // 2. Error observer, called on failure
          // 3. Completion observer, called on successful completion
          promises.push(uploadTask);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
                default:
              }
            },
            (error) => {
              // Handle unsuccessful uploads
              reject();
            },
            async () => {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              await getDownloadURL(uploadTask.snapshot.ref).then(
                (downloadURL) => {
                  urlTemp.push(downloadURL);
                  if (images.length === urlTemp.length) {
                    resolve(urlTemp);
                  }
                }
              );
            }
          );
        });
        // Promise.all(promises)
        //     .then(() => {
        //         console.log("All images uploaded");
        //         console.log(urlTemp);
        //         resolve();
        //     })
        //     .catch((err) => console.log(err));
      } else {
        resolve([]);
      }
    });
  };

  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prev) => [...prev, newImage]);
    }
  };

  const handleDelete = (i) => {
    setImages(images.filter((image) => image !== images[i]));
  };

  const handleSubmit = async (values) => {
    const uri = await handleUpload();
    const uris = await handleUploads();
    const input = {
      ...values,
      img: imageUrl ? imageUrl : uri,
      imgs:
        uris?.length < 1
          ? imagesUrls
          : [...imagesUrls, ...uris].filter(Boolean),
      video: video.filter(Boolean),
      province: province,
    };
    updateCulture(id, input, setIsSubmitting, toast, dispatch);
  };

  return (
    <div className="editCulture">
      <Formik
        initialValues={{
          name: culture.name,
          year: culture.year,
          reg_num: culture.reg_num,
          desc: culture.desc,
        }}
        enableReinitialize
        validationSchema={Yup.object({
          name: Yup.string().required("Harus diisi"),
        })}
        onSubmit={(values) => {
          setIsSubmitting(true);
          handleSubmit(values, setIsSubmitting);
        }}
      >
        <Form className="addCulture">
          <TextField
            label="Nama Ritus"
            type="text"
            name="name"
            placeholder="Nama Ritus"
          />
          <FieldSelected
            options={provinces}
            label="Provinsi"
            value={province}
            setValue={setProvince}
          />

          <TextField
            label="Tahun Registrasi"
            type="number"
            name="year"
            placeholder="2018"
          />
          <TextField
            label="Nomor Registrasi"
            type="text"
            name="reg_num"
            placeholder="20225879"
          />
          <TextArea
            label="Deskripsi"
            name="desc"
            placeholder="Deskripsi dari Ritus "
          />

          <div className="img">
            <div htmlFor="file">
              Gambar Utama
              <label htmlFor="file1" className="uploadButton">
                <DriveFolderUploadIcon className="icon" />
                Pilih Gambar
              </label>
            </div>
            <input
              type="file"
              id="file1"
              onChange={(e) => {
                setImage(e.target.files[0]);
                setImageUrl("");
              }}
              style={{
                display: "none",
                backgroundColor: "red",
              }}
            />
            {image || imageUrl ? (
              <div className="img-container">
                <div className="image">
                  <img
                    src={imageUrl ? imageUrl : URL.createObjectURL(image)}
                    alt="img"
                  />
                  <CloseRoundedIcon
                    onClick={() => {
                      setImage("");
                      setImageUrl("");
                    }}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="img">
            <div>
              Galeri Gambar
              <label htmlFor="file2" className="uploadButton">
                <DriveFolderUploadIcon className="icon" />
                Tambah Gambar
              </label>
            </div>
            <input
              type="file"
              id="file2"
              multiple
              onChange={handleChange}
              style={{
                display: "none",
                backgroundColor: "red",
              }}
            />
            {(images?.length > 0 || imagesUrls?.length > 0) && (
              <div className="images-container">
                {imagesUrls?.map((image, i) => (
                  <div className="images">
                    <img src={image} alt="img" />
                    <CloseRoundedIcon
                      onClick={() =>
                        setImagesUrls(
                          imagesUrls.filter((image) => image !== imagesUrls[i])
                        )
                      }
                    />
                  </div>
                ))}
                {images.map((image, i) => (
                  <div className="images">
                    <img src={URL.createObjectURL(image)} alt="img" />
                    <CloseRoundedIcon onClick={() => handleDelete(i)} />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="input-video">
            <label htmlFor="">Galeri Video</label>
            <input
              type="text"
              placeholder="Link1,https://www.youtube.com/embed/tqbByU0lA7U"
              value={video}
              onChange={handleVideos}
            />
            <p>
              Link berupa link embed ex:
              https://www.youtube.com/embed/tqbByU0lA7U
            </p>
          </div>

          {video?.length > 0 && (
            <div className="videos-container">
              {video?.filter(Boolean).map((video) => (
                <iframe width="320" height="215" src={video}></iframe>
              ))}
            </div>
          )}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <CircularProgress color="inherit" size="1.7rem" thickness={5} />
                Loading ...
              </>
            ) : (
              "Simpan"
            )}
          </button>
        </Form>
      </Formik>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default EditRitus;
