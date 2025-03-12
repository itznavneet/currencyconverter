console.log("Main.js working...");

const populate = async (value, currencyfrom, currencyto) => {
    let myStr = "";
    let url = `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_7HXazqvPR290v7hI6nlNVjG6whyLIDJK1367rFLj&base_currency=${currencyfrom}`;
    
    // Show loader and output div
    document.querySelector(".output").style.display = "block";
    document.querySelector(".loader").style.display = "block";
    document.querySelector(".ans").innerHTML = ""; // Clear previous result

    try {
        let response = await fetch(url);
        let rJson = await response.json();

        console.log(rJson);

        if (rJson["data"] && rJson["data"][currencyto]) {
            myStr = `${(rJson["data"][currencyto] * value).toFixed(2)}`;
        } else {
            myStr = "Conversion rate not available.";
        }

        // Hide loader and show result
        document.querySelector(".loader").style.display = "none";
        document.querySelector(".ans").innerHTML = `<h3>Converted Amount: ${myStr} ${currencyto}</h3>`;

    } catch (error) {
        console.error("Error fetching currency data:", error);
        document.querySelector(".loader").style.display = "none";
        document.querySelector(".ans").innerHTML = "<h3>Failed to fetch data. Try again!</h3>";
    }
};

const btn = document.querySelector(".btn");
btn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("btn clicked");

    const value = parseFloat(document.querySelector("input[name='quantity']").value);
    const currencyfrom = document.querySelector("select[name='currencyfrom']").value;
    const currencyto = document.querySelector("select[name='currencyto']").value;

    if (isNaN(value) || value <= 0) {
        alert("Please enter a valid number.");
        return;
    }

    populate(value, currencyfrom, currencyto);
});
