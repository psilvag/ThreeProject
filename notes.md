//SPHERE================
   //SphereGeometry(radius : Float, widthSegments : Integer, heightSegments : Integer, phiStart : Float, phiLength : Float, thetaStart : Float, thetaLength : Float)
   
   const textureLoader= new THREE.TextureLoader()
   // descargar matcaps de https://github.com/nidorx/matcaps
   const matCap=textureLoader.load('../../public/matcap1.png')
   const geometry = new THREE.SphereGeometry( 0.8, 32, 16 ); 
   const material = new THREE.MeshMatcapMaterial( 
    { 
     matcap:matCap
   } ); 
   const sphere = new THREE.Mesh( geometry, material ); 
   scene.add( sphere );
   sphere.position.set(0,1.5,0)

   
   
   //TORUSKNOT=======================
   // TorusKnotGeometry(radius : Float, tube : Float, tubularSegments : Integer, radialSegments : Integer, p : Integer, q : Integer)
   const geometry1 = new THREE.TorusKnotGeometry( 0.5, 0.18, 100, 16 ); 
   const material1 = new THREE.MeshNormalMaterial( {flatShading:true} ); 
   const torusKnot = new THREE.Mesh( geometry1, material1 ); 
   scene.add( torusKnot );
   torusKnot.position.set(0,-1.5,0)  // (x,y,z)
   //torusKnot.scale.set(2,2,1)  //(x,y,z)
