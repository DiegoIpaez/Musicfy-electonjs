import "./addAlbum.scss";
import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadBytes } from "firebase/storage";
import { storage, db } from "../../../utils/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore/lite";
import noImage from "../../../assets/png/no-image.png";
import { Form, Input, Button, Image, Dropdown } from "semantic-ui-react";
import { commonMessages } from "../../../utils/globalConfig";
import {
  messageError,
  messageSuccess,
  messageWarning,
} from "../../../utils/toast";

const { Field, Group } = Form;

export default function AddAlbum({ setShowModal }) {
  const [banner, setBanner] = useState(null);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [artists, setArtists] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    idArtist: '',
  })

  useEffect(() => {
    const getArtists = async () => {
      try {
        const docRef = collection(db, "artists");
        const querySnapshot = await getDocs(docRef);
        const artistDocs = querySnapshot.docs.map((doc) => ({
          key: doc?.id,
          value: doc?.id,
          text: doc?.data()?.name,
        }));
        setArtists(artistDocs);
      } catch (error) {
        messageWarning(commonMessages.generalError);
      }
    };
    getArtists();
  }, []);

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
    const storageRef = ref(storage, `album/${filename}`);
    const uploadedFile = await uploadBytes(storageRef, file);
    return uploadedFile;
  };

  const createAlbum = async (payload) => {
    try {
      setIsLoading(true);
      if (file) {
        const filename = uuidv4();
        await uploadImage(filename);
        payload.idBanner = filename;
      }
      const docRef = collection(db, "albums");
      await addDoc(docRef, payload);
      messageSuccess("Se ha guardado con exito el artista!");
    } catch (error) {
      messageError(commonMessages.generalError);
    } finally {
      setIsLoading(false);
      setShowModal(false);
    }
  };

  const onSubmit = async () => {
    const { name, idArtist } = formData;
    if (name === "")
      return messageWarning("El nombre del album no puede ir vacio");
    if (idArtist === "")
      return messageWarning("El album debe pertenecer a algun artista");
    await createAlbum(formData);
  };

  return (
    <Form className="add-album-form" onSubmit={() => onSubmit()}>
      <Group>
        <Field className="album-avatar" width={5}>
          <div
            {...getRootProps()}
            className="banner"
            style={{ backgroundImage: `url('${banner}')` }}
          >
            {!banner && <Image src={noImage} />}
            <input {...getInputProps()} />
          </div>
        </Field>
        <Field className="album-inputs" width={11}>
          <Input
            placeholder="Nombre del album"
            type="text"
            name="name"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <Dropdown
            placeholder="El album pertenece a ..."
            fluid
            search
            selection
            options={artists}
            onChange={(_, data) =>
              setFormData((prev) => ({ ...prev, idArtist: data.value }))
            }
            lazyLoad
          />
        </Field>
      </Group>
      <Button type="submit" loading={isLoading}>
        Crear album
      </Button>
    </Form>
  );
}
