export async function get(url) {
   console.log(url);
   let response = await fetch(url);
   let data = await response.json();

   return data;
}

export async function post(url, object) {
   let request = {
      method: "POST",
      body: JSON.stringify(object),
      headers: {
         "Content-Type": "application/json",
         Accept: "application/json",
      },
   };

   let response = await fetch(url, request);
   let data = await response.json();

   return data;
}

export async function put(url, object) {
   let request = {
      method: "PUT",
      body: JSON.stringify(object),
      headers: {
         "Content-Type": "application/json",
         Accept: "application/json",
      },
   };

   let response = await fetch(url, request);
   let data = await response.json();

   return data;
}
