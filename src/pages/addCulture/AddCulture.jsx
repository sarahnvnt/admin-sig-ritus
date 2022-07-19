import React, { useEffect, useState } from "react";
import SelectField from "../../components/fields/selectfield/SelectField";
import TextArea from "../../components/fields/textarea/TextArea";
import TextField from "../../components/fields/textfield/TextField";
import { addCulture, getProvinces } from "../../redux/apiCalls";
import BackupRoundedIcon from "@mui/icons-material/BackupRounded";
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
import "./addculture.scss";
import app from "../../firebase";
import { useDispatch, useSelector } from "react-redux";

const AddCulture = () => {
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [year, setYear] = useState("");
  const [province, setProvince] = useState("");
  const [urls, setUrls] = useState([]);
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const test = ["A", "b", "c"];

  const dispatch = useDispatch();
  const { provinces, isFetching } = useSelector((state) => state.provinces);

  useEffect(() => {
    getProvinces(dispatch);
  }, []);

  // const type = [
  //   {
  //   id :"1"
  //   name: "Pencatatan"
  //   },
  //   {
  //   id :"2"
  //   name: "Penetapan"
  //   },
  //   ]

  const handleUpload = () => {
    return new Promise((resolve, reject) => {
      if (image) {
        let file = image;
        const fileName = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
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
                console.log("Upload paused");
                break;
              case "running":
                console.log("Upload running");
                break;
              default:
            }
          },
          (error) => {
            // Handle unsuccessful uploads
          },
          async () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            await getDownloadURL(uploadTask.snapshot.ref).then(
              (downloadURL) => {
                // setUrl(downloadURL);
                // console.log("success");
                // console.log(downloadURL);
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
      const urlTemp = [];
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
                console.log("Upload paused");
                break;
              case "running":
                console.log("Upload running");
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
                urlTemp.push("2");
                // setUrls((prev) => [...prev, downloadURL]);
                // console.log("success");
                console.log(downloadURL);
                // console.log(uri);
                // resolve(urlTemp);
                // resolve(urlTemp);
              }
            );
          }
        );
        // console.log(urlTemp);
      });
      Promise.all(promises)
        .then(() => {
          console.log("All images uploaded");
          console.log(urlTemp);
          resolve();
        })
        .catch((err) => console.log(err));
    });
  };

  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prev) => [...prev, newImage]);
    }
    console.log(images);
  };

  const handleDelete = (i) => {
    setImages(images.filter((image) => image !== images[i]));
  };

  const handleSubmit = async (values) => {
    const uri = await handleUpload();
    const uris = await handleUploads();
    // const vids = values.video.split(",");
    // const testing = [];
    // testing.push(...uris);
    // uris.map((i) => console.log(i));
    // console.log("testing : ", testing);
    const culture = {
      ...values,
      img: image ? uri : "",
      // imgs: testing,
      // video: vids,
    };
    // console.log(culture.images);
    addCulture(culture, toast, setIsSubmitting);
  };

  return (
    <div className="addRitus">
      <Formik
        initialValues={{
          name: "",
          year: null,
          // type: "",
          reg_num: "",
          desc: "",
          // video: "",
          province: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Nama Wajib diisi"),
          province: Yup.string().required("Provinsi Wajib diisi"),
          year: Yup.number()
            .typeError("Tahun wajib diisi")
            .min(2010, "Tahun harus lebih dari atau sama dengan 2010")
            .max(2022, "Tahun melebihi dari tahun registrasi")
            .required("Tahun Wajib diisi"),
        })}
        onSubmit={(values) => {
          setIsSubmitting(true);
          handleSubmit(values, setIsSubmitting);
        }}
      >
        <Form className="addRitus">
          <TextField
            label="Nama Ritus"
            type="text"
            name="name"
            placeholder="Nama Ritus"
          />
          {/* <SelectField options={type} label="type" name="type" /> */}
          {/* <TextField label="type" type="text" name="type" placeholder="type" /> */}
          <SelectField options={provinces} label="Provinsi" name="province" />
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
            placeholder="0912389485"
          />
          <TextArea
            label="Deskripsi"
            name="desc"
            placeholder="Deskripsi Ritus.."
          />
          <div className="img">
            <div htmlFor="file">
              Gambar Ritus
              <label htmlFor="file1" className="uploadButton">
                <BackupRoundedIcon className="icon" />
                Pilih Gambar
              </label>
            </div>
            <input
              type="file"
              id="file1"
              onChange={(e) => setImage(e.target.files[0])}
              style={{
                display: "none",
                backgroundColor: "red",
              }}
            />
            {image && (
              <div className="img-container">
                <img src={URL.createObjectURL(image)} alt="img" />
              </div>
            )}
          </div>

          <div className="img">
            <div>
              Galeri Gambar Ritus
              <label htmlFor="file2" className="uploadButton">
                <BackupRoundedIcon className="icon" />
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
            {images.length > 0 && (
              <div className="images-container">
                {images.map((image, i) => (
                  <div className="images">
                    <img src={URL.createObjectURL(image)} alt="img" />
                    <CloseRoundedIcon onClick={() => handleDelete(i)} />
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* <TextField
            label="Galeri Video"
            type="text"
            name="video"
            placeholder="Link1,https://www.youtube.com/embed/tqbByU0lA7U"
          /> */}
          <button type="submit">
            {isSubmitting ? (
              <CircularProgress color="inherit" size="1.7rem" thickness={5} />
            ) : (
              "Tambahkan Data Ritus"
            )}
          </button>
        </Form>
      </Formik>
      {/* <a href="/cultures">
        <button>Back</button>
      </a> */}

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

export default AddCulture;
