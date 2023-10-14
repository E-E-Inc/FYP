import "./App.css";
import { Canvas } from "@react-three/fiber";
import Cylinder3d from "./Components/Trees";
function RenderTree() {
  return (
    <>
      <section className='App-header'>
        {/* Canvas 1 */}
        <Canvas>
          <pointLight position={[10, 10, 10]} />
          <ambientLight />
          <Cylinder3d position={[-1.2, 0, 0]} />
        </Canvas>
      </section>
    </>
  );
}
 
export default RenderTree;