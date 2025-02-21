const apiKey = "";

function getOpenAIResponse(message) {
    return fetch("https://api.openai.com/v1/engines/text-davinci-003/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: message,
            temperature: 0.7,
            max_tokens: 150,
            stop: null,
            n: 1,
            timeout: 15
        })
    })
    .then(response => response.json())
    .then(data => data.choices[0].text.trim());
}

function prescribeMedicines(problem) {
    if (problem.toLowerCase().includes("headache")) {
        return "Prescribe: Acetaminophen, Ibuprofen";
    } else if (problem.toLowerCase().includes("cold")) {
        return "Prescribe: Cold medicine, Vitamin C";
    } else if (problem.toLowerCase().includes("pain")) {
        return "Prescribe: Pain reliever, Anti-inflammatory";
    } else {
        return "Prescribe: Consult a medical professional for personalized advice";
    }
}

async function main() {
    console.log("===========================================");
    console.log("Doctor's Assistant Chatbot");
    console.log("===========================================");

    const conversation = [];

    while (true) {
        const userInput = prompt("You: ");
        if (userInput.toLowerCase() === "quit") {
            console.log("Goodbye! Have a nice day.");
            break;
        } else if (userInput.toLowerCase().includes("medical problem")) {
            const problem = prompt("You: Please describe your medical problem: ");
            const prescribedMedicines = prescribeMedicines(problem);
            console.log(`Assistant: Based on your description, I would prescribe the following medicines: ${prescribedMedicines}`);
            continue;
        }

        conversation.push(`Doctor: ${userInput}`);
        const openAIMessage = conversation.join("\n");

        const assistantResponse = await getOpenAIResponse(openAIMessage);
        console.log(`Assistant: ${assistantResponse}`);

        if (assistantResponse.toLowerCase().includes("medical advice")) {
            console.log("Doctor: Here is some general medical advice...");
            // Add logic to provide medical advice based on the context
        }

        conversation.push(`Assistant: ${assistantResponse}`);
    }
}

main();
