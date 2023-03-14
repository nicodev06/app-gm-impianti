import { supabase } from "./supabase-client";

export const selectProjectsByUser = (user, setter) => {
    supabase
    .from('holdings')
    .select('project_id')
    .eq('user_id', user.id)
    .then(({data}) => {
        const projects = data.map((item) => item.project_id)
        supabase
        .from('projects')
        .select()
        .in('id', projects)
        .then(({data, error}) => {
            if (!error){
                setter(data);
            }
        })
    })  
}