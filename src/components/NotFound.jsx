import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <h2 className="text-center mt-2 mb-5">Error 404</h2>
      <p className="text-center mt-2 mb-5">Página não encontrada...</p>
      <button className="--btn">
        <Link to="/">&larr; Voltar para formulário</Link>
      </button>
    </>
  );
};
export default NotFound;
