import { createConsumer } from "@rails/actioncable";

const cable = createConsumer("ws://localhost:3000/cable"); // Ajusta la URL según tu entorno

export default cable;
