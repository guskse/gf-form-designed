import { useState } from "react";
import { toast } from "react-toastify";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    desired_position: "",
    curriculum: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    //checking if text input has only letters
    if (e.target.name === "name") {
      const regMatch = /^[a-zA-Z ]*$/.test(e.target.value);
      if (!regMatch) {
        return;
      }
    }

    //checking if input has only numbers
    if (e.target.name === "phone") {
      const regMatch = /^[0-9]*$/.test(e.target.value);
      if (!regMatch) {
        return;
      }
    }

    //2MB pdf file size limit
    if (name === "curriculum") {
      const file = files[0];
      if (file && file.size > 2 * 1024 * 1024) {
        toast.error("Tamanho do arquivo maior que 2MB.");
        return;
      }
      if (file && file.type !== "application/pdf") {
        toast.error("Arquivo deve estar em formato PDF.");
        return;
      }
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "curriculum" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.curriculum == null) {
      toast.error("Arquivo com formato incorreto.");
      return;
    }

    //Check file size (limit 2Mb)
    if (formData.curriculum && formData.curriculum.size > 2 * 1024 * 1024) {
      toast.error("Arquivo excede o limite de 2Mb");
      return;
    }

    //Check format of file (pdf)
    if (formData.curriculum && formData.curriculum.type !== "application/pdf") {
      toast.error("Arquivo deve estar em formato PDF.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("fullname", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("desired_position", formData.desired_position);
    formDataToSend.append("file", formData.curriculum);

    // console.log("data to send:", formDataToSend);

    try {
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        toast.success("Currículo enviado!");
        // console.log("response:", response);
      }
    } catch (error) {
      toast.error("Erro ao enviar currículo. Tente novamente.");
      console.error(error);
    }

    setFormData({
      name: "",
      email: "",
      phone: "",
      desired_position: "",
      curriculum: null,
    });
  };

  return (
    <>
      <h2 className="title">Envie seu Currículo</h2>
      <form
        className="form-container"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            className="form-control mb-3"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            maxLength={50}
          />
        </div>
        <div className="form-group">
          <label className="col-sm-2 col-form-label" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            className="form-control mb-3"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            maxLength={50}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Telefone:</label>
          <input
            type="tel"
            className="form-control mb-3"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            maxLength={11}
          />
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label" htmlFor="desired_position">
            Posição Desejada:
          </label>

          <select
            id="desired_position"
            className="form-control mb-3"
            name="desired_position"
            value={formData.desired_position}
            onChange={handleChange}
            required
          >
            <option value="">Selecione cargo</option>
            <option value="Assistente-administrativo">
              Assistente Administrativo
            </option>
            <option value="Assistente-compras">Assistente de Compras</option>
            <option value="Assistente-marketing">
              Assistente de Marketing
            </option>
            <option value="Assistente-rh">Assistente de RH</option>
            <option value="Cozinheiro">Cozinheiro(a)</option>
            <option value="Desenvolvedor">Desenvolvedor(a)</option>
            <option value="Motorista">Motorista</option>
            <option value="Nutricionista">Nutricionista</option>
            <option value="Recepcionista">Recepcionista</option>
            <option value="Servicos-gerais">Serviços Gerais</option>
            <option value="TI">Técnico(a) de Informática</option>
          </select>
        </div>

        <div className="form-group">
          <label className="curriculo-label" htmlFor="curriculum">
            Currículo:
          </label>

          <input
            type="file"
            className="form-control-file"
            name="curriculum"
            id="curriculum"
            accept=".pdf"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn send-btn">
          Enviar
        </button>
      </form>
    </>
  );
};
export default Form;
