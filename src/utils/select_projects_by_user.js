import { supabase } from "./supabase-client";

export const selectProjectsByUser = (user, setter, archived=null) => {
    supabase
    .from('holdings')
    .select('project_id')
    .eq('user_id', user.id)
    .then(({data}) => {
        const projects = data.map((item) => item.project_id)
        supabase
        .from('projects')
        .select()
        .is('status', archived)
        .in('id', projects)
        .then(({data, error}) => {
            if (!error){
                setter(data);
            }
        })
    })  
}