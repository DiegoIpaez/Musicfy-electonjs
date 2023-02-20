import { useParams } from "react-router-dom";

export default function Artist() {
  const { id } = useParams();
  return <h2>{id}</h2>;
}
