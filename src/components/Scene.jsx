import { useEffect,useRef } from 'react'
import * as THREE from 'three'

const Scene = () => {

  const mountRef=useRef(null)

  useEffect(()=>{

   const currentMount=mountRef.current
   // =========create scene===========
   const scene= new THREE.Scene()

   // =========create camera===========
   const camera=new THREE.PerspectiveCamera(25,currentMount.clientWidth/currentMount.lientHeight,
    0.1,
    1000
   )// fov // near we can see the objects  //far we can see the objects aspect ratio width/height
   
   camera.position.z=8  // move Z camera position 

   //=====================add camera into scene===========
   scene.add(camera)   
   
   //========================create renderer===========
   const renderer= new THREE.WebGL1Renderer()
   renderer.setSize(currentMount.clientWidth,currentMount.clientHeight)
   currentMount.appendChild(renderer.domElement)
  
   //==================================FIGURES===================================================
   //================================CUBE==================
  const cube= new THREE.Mesh(
    new THREE.BoxBufferGeometry(1,1,1), // WIDTH, HEIGHT AND DEPTH
    new THREE.MeshBasicMaterial()
  )
  scene.add(cube)
  cube.position.z=-5

  //================================SPHERE================
  //SphereGeometry(radius : Float, widthSegments : Integer, heightSegments : Integer, phiStart : Float, phiLength : Float, thetaStart : Float, thetaLength : Float)
  const geometry = new THREE.SphereGeometry( 0.8, 32, 16 ); 
  const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 
  const sphere = new THREE.Mesh( geometry, material ); 
  scene.add( sphere );
  sphere.position.x=2
  sphere.position.y=2

  //================================TORUSKNOT=======================

  // TorusKnotGeometry(radius : Float, tube : Float, tubularSegments : Integer, radialSegments : Integer, p : Integer, q : Integer)
  const geometry1 = new THREE.TorusKnotGeometry( 0.3, 0.1, 100, 16 ); 
  const material1 = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 
  const torusKnot = new THREE.Mesh( geometry1, material1 ); 
  scene.add( torusKnot );
  torusKnot.position.set(-2,0.5,0)  // (x,y,z)
  torusKnot.scale.set(2,2,1)  //(x,y,z)
  

 //========Render the scene===========
    renderer.render(scene,camera)

 //========Clean up scene============
 return()=>{
  currentMount.removeChild(renderer.domElement)
 }

  },[])


  return (
    <div className='contenedor3D' style={{width:'100%', height:'100vh'}} ref={mountRef}>
       
    </div>
  )
}

export default Scene