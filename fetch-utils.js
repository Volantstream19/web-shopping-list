const SUPABASE_URL = 'https://qboehdsdeqtplyyvocha.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFib2VoZHNkZXF0cGx5eXZvY2hhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM4ODE1ODUsImV4cCI6MTk3OTQ1NzU4NX0.s31ZEiEVJ9Js-r6C8mHNqfNQm38E9r2kngKpw7NjGaI';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */

export async function createListItem(item, quantity) {
    return await client.from('Shopping List').insert([{ item, quantity }]);
}
export async function getList() {
    return await client.from('Shopping List').select('*');
}
export async function completeItem(id) {
    return await client.from('Shopping List').update({ bought: true }).eq('id', id).single();
}
export async function deleteBoughtItem() {
    const user = getUser();
    return await client.from('Shopping List').delete().eq('user_id', user.id);
}
export async function deletePurchased() {
    const user = getUser();
    return await client
        .from('Shopping List')
        .delete()
        .eq('user_id', user.id)
        .match({ bought: true });
}
