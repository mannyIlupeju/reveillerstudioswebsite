import validator from "validator";

export async function POST(req){
    console.log("=== REGISTER API ROUTE CALLED ===");

    const body = await req.json()

    const {acceptsMarketing, firstName, lastName, phone, email, password} = body;

    // Basic email format validation
    if (!validator.isEmail(email)) {
        return new Response(JSON.stringify({ error: "Invalid email format" }), { status: 400 });
    }

    // Check for allowed providers
    // const allowedProviders = [
    //     "gmail.com",
    //     "yahoo.com",
    //     "outlook.com",
    //     "hotmail.com",
    //     "icloud.com",
    //     "aol.com"
    // ];
    // const domain = email.split("@")[1]?.toLowerCase();
    // if (!domain || !allowedProviders.includes(domain)) {
    //     return new Response(JSON.stringify({ error: "Please use a valid email provider (Gmail, Yahoo, Outlook, etc.)" }), { status: 400 });
    // }

    try {
        const query = `
            customerCreate(input: $input) {
                customer {
                id
                email
                firstName
                lastName
                phone
                }
                customerUserErrors {
                code
                field
                message
                }
            }
            }
        `
        const response = await fetch(`https://${process.env.SHOPIFY_DOMAIN}/api/${process.env.SHOPIFY_API_VERSION}/graphql.json`, {
            method: 'POST',
            body: JSON.stringify({
                query,
                variables: {
                    input: {
                        firstName,
                        lastName,
                        email,                      
                        phone,
                        password,
                        acceptsMarketing: acceptsMarketing === true || acceptsMarketing === 'true',
                    }
                }   
            }),
            headers: { 
                'Content-Type': 'application/json',
                "X-Shopify-Storefront-Access-Token": `${process.env.SHOPIFY_PUBLIC}`,
             },
            
        });

        console.log("Response from backend:", response.status, response.statusText);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const newData = await response.json();

    } catch (error) {
        console.error("Error creating customer:", error);
        return new Response(JSON.stringify({ error: "Error creating customer", details: error.message }), { status: 500 });
    }
}


