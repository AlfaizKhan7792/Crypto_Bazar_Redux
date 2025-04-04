import axios from "axios"

export const FetchTrendingCoins = async () =>{
    try {
        const response = await axios.get("https://api.coingecko.com/api/v3/search/trending");

        // 🔹 Saare coins ka naam `ids` array me collect karna
        const coinIds = response.data.coins.map(coin => coin.item.id).join(",");
        // console.log(coinIds);

        // 🔹 Real-time price aur change fetch karna (Multiple Coins)
        const priceResponse = await axios.get(
            `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=usd&include_24hr_change=true`
        );

        // 🔹 Saare coins ko format karna
        const formattedCoins = response.data.coins.map(coin => ({
            name: coin.item.name,
            symbol: coin.item.symbol,
            price: `$${priceResponse.data[coin.item.id].usd.toLocaleString()}`, // Price formatted
            change: `${priceResponse.data[coin.item.id].usd_24h_change.toFixed(2)}%`, // 24-hour change
            icon: coin.item.thumb
        }));
        return formattedCoins;
    } catch (error) {
        console.log(error.message);
    }
}


export const FetchSearchCoins = async (query) =>{
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`)
        // localStorage.setItem("CardItems", JSON.stringify(response.data))
        return response.data.coins
    } catch (error) {
        console.log(error);
    }
}


export const FetchSingleCoin = async (id) =>{
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
}