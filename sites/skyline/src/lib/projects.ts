import type { ProjectPageData } from '@/components/ProjectPage';

const project: ProjectPageData = {
 id:'skyline-demo', name:'Skyline Bay Residences', slug:'skyline-bay-residences', developer:'Meridian Realty',
 location:'Andheri West, Mumbai', status:'UNDER CONSTRUCTION', areaValue:2.5, areaUnit:'Acres', towers:2,
 possessionDate:new Date('2028-10-31'), reraNumber:'DEMO-RERA-0000000', reraAuthorityUrl:null,
 tagline:'2, 3 & 4 BHK residences, moments from everything that matters.',
 description:'A modern residential project experience with thoughtfully designed homes, lifestyle amenities and convenient connectivity.',
 heroImageUrl:'/images/hero.jpg', brochureUrl:'/uploads/skyline-bay-residences-brochure.pdf',
 configurations:[
 {id:'c1',type:'2 BHK',carpetAreaSqft:650,price:15000000,startingPrice:15000000,floorPlanUrl:'/images/floorplan-2bhk.svg',availability:'AVAILABLE'},
 {id:'c2',type:'3 BHK',carpetAreaSqft:900,price:22000000,startingPrice:22000000,floorPlanUrl:'/images/floorplan-3bhk.svg',availability:'AVAILABLE'},
 {id:'c3',type:'4 BHK',carpetAreaSqft:1250,price:32000000,startingPrice:32000000,floorPlanUrl:'/images/floorplan-4bhk.svg',availability:'LIMITED'}],
 amenities:[
 {id:'a1',name:'Swimming Pool',category:'LEISURE',imageUrl:'/images/pool.jpg'},
 {id:'a2',name:'Fitness Studio',category:'FITNESS',imageUrl:'/images/gym.jpg'},
 {id:'a3',name:'Clubhouse',category:'LEISURE',imageUrl:'/images/clubhouse.jpg'},
 {id:'a4',name:'Landscaped Garden',category:'OUTDOOR',imageUrl:'/images/garden.jpg'},
 {id:'a5',name:'Kids Play Area',category:'FAMILY',imageUrl:'/images/kids-play.jpg'},
 {id:'a6',name:'Power Backup',category:'UTILITY',imageUrl:'/images/power-backup.jpg'},
 {id:'a7',name:'24/7 Security',category:'SECURITY',imageUrl:'/images/security.jpg'}],
 features:[
 {id:'f1',title:'Thoughtful Design',description:'Homes planned for comfortable everyday living.',imageUrl:'/images/interior.jpg'},
 {id:'f2',title:'Connected Location',description:'Close to everyday conveniences and key destinations.',imageUrl:'/images/location.jpg'},
 {id:'f3',title:'Premium Spaces',description:'Welcoming common areas and modern finishes.',imageUrl:'/images/lobby.jpg'}],
 galleryItems:[
 {id:'g1',url:'/images/exterior.jpg',alt:'Exterior',category:'EXTERIOR'},{id:'g2',url:'/images/interior.jpg',alt:'Interior',category:'INTERIOR'},
 {id:'g3',url:'/images/pool.jpg',alt:'Pool',category:'AMENITY'},{id:'g4',url:'/images/gym.jpg',alt:'Gym',category:'AMENITY'},
 {id:'g5',url:'/images/garden.jpg',alt:'Garden',category:'AMENITY'},{id:'g6',url:'/images/clubhouse.jpg',alt:'Clubhouse',category:'INTERIOR'}],
 locationPoints:[
 {id:'l1',name:'Metro Station',category:'METRO',distanceKm:1.2,travelTimeMin:5},{id:'l2',name:'Business District',category:'BUSINESS',distanceKm:4,travelTimeMin:15},
 {id:'l3',name:'Airport',category:'AIRPORT',distanceKm:8,travelTimeMin:25}],
 faqs:[{id:'q1',question:'What configurations are available?',answer:'2, 3 and 4 BHK configurations are available.'},{id:'q2',question:'How can I enquire?',answer:'Use the enquiry form and our team will contact you.'}]
};
export async function getProjectBySlug(slug:string){return slug===project.slug?project:null}
export async function getFirstPublishedProject(){return project}
