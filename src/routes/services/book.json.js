export async function get(req, res) {
    // connect to db to fetch & parse data
    let data = await fetch("https://jsonplaceholder.typicode.com/posts")
    .then().catch((err)=> console.log(err));
  
    return {
      status: 200,
      body: { data }, 
    }
  };

  export async function post(req,res) {
    console.log(req.body);

    return {
      status: 200,
      body: { test: "ok" }
    }
  };