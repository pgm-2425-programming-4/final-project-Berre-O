export async function getTasks() {
    const result = await fetch('http://localhost:1338/api/tasks?populate=*', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + "8053ef50895b27f559b495f47e205b9308f4f5adee57826a40f6aba21fa828d5cc21f40561bf1a95d066d2d733616482a2ce6e2739421ca4f3eb83185ad76464cc983310f548e0507bb495fe6ecd7929e700c40378947e88a0f24ad22346ea287e2692625d356f5000bd18a7d2c43c3282227e828f61defe316660abe979bbc0"
    }});

        const data = await result.json();
        return data.data;
}