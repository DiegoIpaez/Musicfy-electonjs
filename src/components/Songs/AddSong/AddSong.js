import "./addSong.scss";
import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadBytes } from "firebase/storage";
import { storage, db } from "../../../utils/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore/lite";
import { Form, Input, Button, Dropdown, Icon } from "semantic-ui-react";
import { commonMessages } from "../../../utils/globalConfig";
import {
  messageError,
  messageSuccess,
  messageWarning,
} from "../../../utils/toast";

const { Field } = Form;

export default function AddSong({ setShowModal }) {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    idAlbum: "",
  });

  useEffect(() => {
    const getAlbums = async () => {
      try {
        const docRef = collection(db, "albums");
        const querySnapshot = await getDocs(docRef);
        const artistDocs = querySnapshot.docs.map((doc) => ({
          key: doc?.id,
          value: doc?.id,
          text: doc?.data()?.name,
        }));
        setAlbums(artistDocs);
      } catch (error) {
        messageWarning(commonMessages.generalError);
      }
    };
    getAlbums();
  }, []);

  const onDrop = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setFile(file);
  }, []);

  const { getInputProps, getRootProps } = useDropzone({
    accept: {
      "audio/mpeg": [".mp3", ".mpeg", ".mpegaudio"],
    },
    noKeyboard: true,
    onDrop,
  });

  const uploadSong = async (filename) => {
    const storageRef = ref(storage, `song/${filename}`);
    const uploadedFile = await uploadBytes(storageRef, file);
    return uploadedFile;
  };

  const createSong = async (payload) => {
    try {
      setIsLoading(true);
      if (file) {
        const filename = uuidv4();
        await uploadSong(filename);
        payload.idFile = filename;
      }
      const docRef = collection(db, "songs");
      await addDoc(docRef, payload);
      messageSuccess("Se ha guardado con exito la cancion!");
    } catch (error) {
      messageError(commonMessages.generalError);
    } finally {
      setIsLoading(false);
      setShowModal(false);
    }
  };

  const onSubmit = async () => {
    const { name, idAlbum } = formData;
    if (name === "")
      return messageWarning("El nombre de la cancion no puede ir vacio");
    if (idAlbum === "")
      return messageWarning("La cancion debe pertenecer a algun album");
    await createSong(formData);
  };

  return (
    <Form className="add-song" onSubmit={() => onSubmit()}>
      <Field>
        <Input
          placeholder="Nombre de la cancion"
          name="name"
          onChange={(_, data) =>
            setFormData((prev) => ({ ...prev, name: data.value }))
          }
        />
      </Field>
      <Field>
        <Dropdown
          placeholder="Esta cancion perteneca al album..."
          fluid
          search
          selection
          options={albums}
          onChange={(_, data) =>
            setFormData((prev) => ({ ...prev, idAlbum: data.value }))
          }
          lazyLoad
        />
      </Field>
      <Field>
        <div className="song-upload" {...getRootProps()}>
          <input {...getInputProps()} />
          <Icon name="cloud upload" className={file && "load"} />
          <div>
            <p>
              Arrastra el archivo aqui o haz click <span>aqui</span>.
            </p>
            {file && (
              <p>
                Cancion subida: <span>{file?.name}</span>
              </p>
            )}
          </div>
        </div>
      </Field>
      <Button type="submit" loading={isLoading}>
        Subir cancion
      </Button>
    </Form>
  );
}
