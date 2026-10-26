import type {Edge, Node} from '@xyflow/react';

export const kinds=['introduction','scripture','experience','principle','conference','question','activity','application','custom','conclusion'] as const;
export type Kind=typeof kinds[number];
export type Section={kind:Kind;title:string;content:string;minutes:number;notes:string;reference?:string;sourceUrl?:string;readerUrl?:string;speaker?:string;date?:string;talkId?:string;private?:boolean;[key:string]:unknown};
export type Lesson={id:string;title:string;topic:string;contentType:string;duration:number;audience:string;language:'en'|'es';nodes:Node<Section>[];edges:Edge[];updatedAt:string;versions:{at:string;nodes:Node<Section>[];edges:Edge[]}[]};
export type Source={id:string;kind:'scripture'|'conference';title:string;detail:string;sourceUrl:string;readerUrl:string;speaker?:string;date?:string;talkId?:string};
export const storageKey='stillwater:builder:v1';
export function readProjects():Lesson[]{try{return JSON.parse(localStorage.getItem(storageKey)||'[]')}catch{return []}}
export function saveProject(p:Lesson){const all=readProjects().filter(x=>x.id!==p.id);localStorage.setItem(storageKey,JSON.stringify([p,...all]));}
export function deleteProject(id:string){localStorage.setItem(storageKey,JSON.stringify(readProjects().filter(x=>x.id!==id)))}
export function newId(){return typeof crypto!=='undefined'&&crypto.randomUUID?crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2)}`}
export function section(kind:Kind, title?:string):Section {const labels:Record<Kind,string>={introduction:'Introduction',scripture:'Scripture',experience:'Personal experience',principle:'Gospel principle',conference:'General Conference',question:'Discussion question',activity:'Activity',application:'Application',custom:'Custom section',conclusion:'Conclusion'};return {kind,title:title||labels[kind],content:'',minutes:kind==='question'||kind==='activity'?5:3,notes:'',private:kind==='experience'}}
export function sourceSection(s:Source):Section{return {kind:s.kind,title:s.title,content:s.detail,minutes:4,notes:'',reference:s.kind==='scripture'?s.title:undefined,sourceUrl:s.sourceUrl,readerUrl:s.readerUrl,speaker:s.speaker,date:s.date,talkId:s.talkId}}
export function snapshot(p:Lesson){return {at:new Date().toISOString(),nodes:structuredClone(p.nodes),edges:structuredClone(p.edges)}}
