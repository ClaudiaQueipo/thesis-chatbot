import NavigationBar from "../../components/NavigationBar";
import { Accordion, AccordionItem } from "@nextui-org/react";

export default function Home() {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <div>
      <NavigationBar />
      <div style={{ margin: "50px" }}>
        <Accordion>
          <AccordionItem
            key="1"
            aria-label="Accordion 1"
            title="¿Cómo crear un asistente?"
          >
            {defaultContent}
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="Accordion 2"
            title="¿Cómo funciona la plataforma?"
          >
            {defaultContent}
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
