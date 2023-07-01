import { useEffect,useRef } from 'react'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
const Scene = () => {

  const mountRef=useRef(null)
  

  useEffect(()=>{

    const currentMount=mountRef.current   
    
    // =========create scene===========
    const scene= new THREE.Scene()
 
    // =========create camera===========
    // fov , aspect ratio width/height,near we can see the objects,far we can see the objects
    const camera=new THREE.PerspectiveCamera(25,currentMount.clientWidth/currentMount.clientHeight,
     0.1,
     1000
    )
 
    // move Z camera position 
    camera.position.z= 12
     //=====================add camera into scene===========
    scene.add(camera)   
    
    //========================CREATE RENDERER===========
    const renderer= new THREE.WebGLRenderer()
    renderer.setSize(currentMount.clientWidth,currentMount.clientHeight)
    currentMount.appendChild(renderer.domElement)

    //===========CONTROLS=======================
    const controls= new OrbitControls(camera,renderer.domElement)
    controls.target=new THREE.Vector3(0,0,0)
    controls.enableDamping=true  // delay after click mouse

    // Textures
    // Dowload textures https://3dtextures.me/tag/brick/
    const textureLoader= new THREE.TextureLoader()
    const map=textureLoader.load('../../public/wall-stone-010-basecolor.webp')
    const aoMap=textureLoader.load('../../public/wall-stone-010-ambientocclusion.webp')
    const roughnessMap=textureLoader.load('../../public/Wall_Stone_010_roughness.webp')
    const normalMap=textureLoader.load('../../public/Wall_Stone_010_normal.webp')
    const heightMap=textureLoader.load('../../public/wall-stone-010-height.webp')

    
    /* Ligths
       -ambient ligth: iluminacion igual en todos lados
       -point light: en forma de bombilla, posicionamos la bombilla, por defecto esta en el origen
       -directional Light: definimos la direccion donde apunta la luz, por defecto apunta al origen
       -hdri: usar la luz que emite una imagen para iluminar tu escena, 
       descargar hdri de aqui: https://polyhaven.com/hdris
       convertir el archivo descargado hdri a cubemap: https://matheowis.github.io/HDRI-to-CubeMap/
    */
    
    //=========AMBIENT LIGHT=====================
    const AO = new THREE.AmbientLight(0xffffff,0.7) 
    scene.add(AO) 
    
    //===========POINTER LIGHT===========================
    // const pointLigth= new THREE.PointLight(0xffff65,1.3)
    // pointLigth.position.y=2
    // scene.add(pointLigth)
    
    //===========DIRECTIONAL LIGHT=======================
    const direcionalLigth= new THREE.DirectionalLight(0xffffff,1.3)
    direcionalLigth.position.set(5,5,5)
    scene.add(direcionalLigth)

    //===========ENVIROMENT LIGHT========================
    const enviromentMap= new THREE.CubeTextureLoader()
    const envMap= enviromentMap.load([
      '../../public/envMap/px.webp',
      '../../public/envMap/nx.webp',
      '../../public/envMap/py.webp',
      '../../public/envMap/ny.webp',
      '../../public/envMap/pz.webp',
      '../../public/envMap/nz.webp',
    ])
    scene.environment=envMap
    scene.background=envMap

    //==================================FIGURES===================================================
    //Cube
     const geometryCube= new THREE.BoxGeometry(1,1,1,250,250,250)
     const materialCube= new THREE.MeshStandardMaterial({
       map:map,
       aoMap:aoMap,
       roughnessMap:roughnessMap,
       normalMap:normalMap,
       displacementMap:heightMap,
       displacementScale:0.07
     })
     const cube= new THREE.Mesh(geometryCube,materialCube)
     cube.scale.set(3,3,3)
     scene.add(cube)
  
    
   
  //==================================RENDER THE SCENE========================================
  const animate=()=>{
    controls.update()
    renderer.render(scene,camera)
    requestAnimationFrame(animate)
  }
  animate()


  //==================================Clean up scene============
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