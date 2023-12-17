import AssistantForm from "../../components/assistant-form/AssistantForm";
import GeneratedQA from "../../components/assistant-form/GeneratedQA";
import { Link } from "react-router-dom";


const flexRowStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
};
const cardStyle = {
  minWidth: "300px",
  width: "100%",
  maxWidth: "50%",
};

const sectionStyle = {
  display: "flex",
  // height: "100%",
  width: "100%",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  gap: "50px",
  // margin: "50px 20px",
};

export default function CreateAssistant() {

  return (
    <div style={{ position: "relative", margin: "0 100px" }}>
      <Link
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          marginTop: "30px",
          color: "#f5a524",
        }}
        to="/gestion-asistentes"
      >
        EvoAssist
      </Link>
      <section style={sectionStyle}>
        <AssistantForm
          cardStyle={cardStyle}
          flexRowStyle={flexRowStyle}
        />
        <GeneratedQA cardStyle={cardStyle} flexRowStyle={flexRowStyle} />
      </section>
    </div>
  );
}
