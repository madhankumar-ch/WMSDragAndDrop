import * as THREE from 'three';
import { getPlaneGeometry } from "plane";

export function buildAreas(json, scene, warehouseCenter, width, depth){
    let previousAreaPosition = new THREE.Vector3(warehouseCenter.x-width/2+json['areas'][0]['width']/2, warehouseCenter.y+0.05, warehouseCenter.z-depth/2+json['areas'][0]['depth']/2);
    let coveredWidth = json['areas'][0]['width'];

    json['areas'].forEach((item, index) => {
        const area = getPlaneGeometry(item['width'], item['depth']);
        console.log('coveredWidth '+coveredWidth+' width '+width);
        if(coveredWidth <= width){
            area.position.set(previousAreaPosition.x, previousAreaPosition.y, previousAreaPosition.z);
            scene.add(area);
            previousAreaPosition.x = previousAreaPosition.x + coveredWidth/2+json['areas'][index+1]['width']/2;
            console.log('index '+ index+ 'length ' +json['areas'].length);
            if(index < json['areas'].length){
                coveredWidth = coveredWidth + json['areas'][index+1]['width'];
            }
        }else{
            console.log(warehouseCenter.x + " " + warehouseCenter.y + " " + warehouseCenter.z);
            console.log(previousAreaPosition.x + " " + previousAreaPosition.y + " " + previousAreaPosition.z);
        }
    });
}
