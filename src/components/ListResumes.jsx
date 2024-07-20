import { useEffect, useState } from "react";

import { toast } from "react-toastify";

const ListResumes = () => {
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //states de paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const candidatesPerPage = 10; // Número de candidatos por página

  const getCandidates = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/pagination?page=${currentPage}&limit=${candidatesPerPage}`
      );
      const jsonData = await response.json();
      setCandidates(jsonData.results);
      setTotalPages(jsonData.totalPages);
      setIsLoading(false);
    } catch (err) {
      toast.error("Não foi possível encontrar candidato(s)");
      setIsLoading(false);
    }
  };

  const getCandidateResume = async (candidateId) => {
    fetch(`http://localhost:3000/candidate/${candidateId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/pdf",
      },
    })
      .then((response) => {
        // console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        window.open(url);
      })
      .catch((error) => {
        console.error("Erro ao fazer o fetch do pdf: ", error);
        toast.error("Não foi possível encontrar arquivo pdf.");
      });
  };

  useEffect(() => {
    getCandidates();
  }, [currentPage]);

  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber || typeof phoneNumber !== "string") {
      return "";
    }

    phoneNumber = phoneNumber.replace(/\D/g, "");

    const formattedPhoneNumber = phoneNumber.replace(
      /(\d{2})(\d{4})(\d{4})/,
      "($1) $2-$3"
    );
    return formattedPhoneNumber;
  };

  if (isLoading) {
    return (
      <>
        <h3 className="msg">carregando...</h3>
      </>
    );
  }

  return (
    <>
      <h2 className="table-title">Candidatos</h2>

      {candidates.length == 0 ? (
        <h3 className="msg">Sem candidatos ainda...</h3>
      ) : (
        <table className="table-container">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Contato</th>
              <th>Currículo</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate, index) => {
              return (
                <tr key={index}>
                  <td>{candidate.id}</td>
                  <td>{candidate.fullname}</td>
                  <td>{candidate.email}</td>
                  <td>{formatPhoneNumber(candidate.phone)}</td>
                  <td>
                    <button
                      className="btn-table"
                      onClick={() => getCandidateResume(candidate.id)}
                    >
                      Visualizar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <div className="buttons-container">
        {currentPage > 1 ? (
          <button
            className="btn-table"
            onClick={() =>
              setCurrentPage((prevPage) =>
                prevPage > 1 ? prevPage - 1 : prevPage
              )
            }
            disabled={currentPage === 1}
          >
            Página anterior
          </button>
        ) : (
          ""
        )}

        {candidates.length < 1 || currentPage === totalPages ? (
          ""
        ) : (
          <button
            className="btn-table"
            onClick={() =>
              setCurrentPage((prevPage) =>
                prevPage < totalPages ? prevPage + 1 : prevPage
              )
            }
            disabled={currentPage === totalPages}
          >
            Próxima página
          </button>
        )}
      </div>
    </>
  );
};

export default ListResumes;
