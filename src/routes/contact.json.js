export async function post (req) {
    
    let data = req.request.body;
    console.log(data);
    const response = await fetch('http://192.168.0.104:5000/api/contact', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data), 
    });
    if(res.ok){
        return response;
    }
    else {
        throw new Error('Could not POST');
    }
}