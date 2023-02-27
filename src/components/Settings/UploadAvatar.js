import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useCallback, useState } from "react";
import { updateProfile } from "firebase/auth";
import { useDropzone } from "react-dropzone";
import { Image } from "semantic-ui-react";
import { toast } from "react-toastify";
import { storage } from "../../utils/firebase";
import noAvatar from "../../assets/png/user.png";

const UploadAvatar = ({ user }) => {
  const [avatarUrl, setAvatarUrl] = useState(user?.photoURL);

  const onDrop = useCallback(
    async (acceptedFile) => {
      const storageRef = ref(storage, `avatar/${user.uid}`);
      const uploadImage = async (file) => {
        const uploadedFile = await uploadBytes(storageRef, file);
        return uploadedFile;
      };
      const updateAvatar = async () => {
        const url = await getDownloadURL(storageRef);
        await updateProfile(user, { photoURL: url });
      };
      try {
        const file = acceptedFile[0];
        const urlFile = URL.createObjectURL(file);
        const uploadedImage = await uploadImage(file);

        if (uploadedImage?.metadata?.name) {
          await updateAvatar();
          setAvatarUrl(urlFile);
          toast.success("Se ha cambiado con exito, la foto de perfil.");
        }
      } catch (error) {
        toast.warning("Error al subir la imagen, intentelo mas tarde");
      }
    },
    [setAvatarUrl, user]
  );

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    noKeyboard: true,
    onDrop,
  });

  return (
    <div className="user-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Image src={noAvatar} />
      ) : (
        <Image src={!avatarUrl ? noAvatar : avatarUrl} />
      )}
    </div>
  );
};

export default UploadAvatar;
