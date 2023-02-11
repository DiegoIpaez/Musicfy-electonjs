import "./addArtistForm.scss";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadBytes } from "firebase/storage";
import { storage, db } from "../../../utils/firebase";
import { addDoc, collection } from 'firebase/firestore/lite'
import noImage from "../../../assets/png/no-image.png";
import { Form, Input, Button, Image } from "semantic-ui-react";
import { commonMessages } from "../../../utils/globalConfig";
import {
  messageError,
  messageSuccess,
  messageWarning,
} from "../../../utils/toast";

const { Field } = Form;

const AddArtistForm = ({ setShowModal }) => {
  const [banner, setBanner] = useState(null);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    const url = URL.createObjectURL(file);
    setFile(file);
    setBanner(url);
  }, []);

  const { getInputProps, getRootProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    noKeyboard: true,
    onDrop,
  });

  const uploadImage = async (filename) => {
    const storageRef = ref(storage, `artist/${filename}`);
    const uploadedFile = await uploadBytes(storageRef, file);
    return uploadedFile;
  };

  const createArtist = async (payload) => {
    try {
      setIsLoading(true);
      if (file) {
        const filename = uuidv4();
        await uploadImage(filename);
        payload.banner = filename;
      }
      const docRef = collection(db, 'artists');
      await addDoc(docRef, payload)
      messageSuccess("Se ha guardado con exito el artista!");
    } catch (error) {
      messageError(commonMessages.generalError);
    } finally {
      setIsLoading(false);
      setShowModal(false);
    }
  };

  const onSubmit = async ({ target }) => {
    const formData = new FormData(target);
    const { musicalGenre, name } = Object.fromEntries(formData);
    if (name === "")
      return messageWarning("El nombre del artista no puede ir vacio");
    if (musicalGenre === "")
      return messageWarning("Genero musical no puede ir vacio");
    await createArtist({ musicalGenre, name });
  };

  return (
    <Form className="add-artist-form" onSubmit={(values) => onSubmit(values)}>
      <Field className="artist-banner">
        <div
          {...getRootProps()}
          className="banner"
          style={{ backgroundImage: `url('${banner}')` }}
        >
          {!banner && <Image src={noImage} />}
          <input {...getInputProps()} />
        </div>
      </Field>
      <Field className="artist-avatar">
        <div
          className="avatar"
          style={{ backgroundImage: `url('${!banner ? noImage : banner}')` }}
        />
      </Field>
      <Field>
        <Input placeholder="Nombre del artista" type="text" name="name" />
      </Field>
      <Field>
        <Input placeholder="Genero" type="text" name="musicalGenre" />
      </Field>
      <Button type="submit" loading={isLoading}>
        Crear artista
      </Button>
    </Form>
  );
};

export default AddArtistForm;
