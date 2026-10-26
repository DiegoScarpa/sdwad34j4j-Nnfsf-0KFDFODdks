import {createClient,type SupabaseClient} from '@supabase/supabase-js';
import type {Lesson} from './model';
let client:SupabaseClient|null=null;
export function cloud(){const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;if(!url||!key)return null;return client||(client=createClient(url,key))}
export async function cloudProjects():Promise<Lesson[]>{const db=cloud();if(!db)return [];const {data,error}=await db.from('lesson_projects').select('content').order('updated_at',{ascending:false});if(error)throw error;return (data||[]).map(x=>x.content as Lesson)}
export async function cloudSave(project:Lesson){const db=cloud();if(!db)return;const {data:{user}}=await db.auth.getUser();if(!user)return;const {error}=await db.from('lesson_projects').upsert({id:project.id,user_id:user.id,content:project,updated_at:project.updatedAt});if(error)throw error}
export async function cloudDelete(id:string){const db=cloud();if(!db)return;const {error}=await db.from('lesson_projects').delete().eq('id',id);if(error)throw error}
