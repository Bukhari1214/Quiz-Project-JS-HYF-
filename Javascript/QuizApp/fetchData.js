let fetchedQuizData;

async function fetchQuizData() {
  let fetchedData = null;

  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/Bukhari1214/bukhari1214.github.io/refs/heads/main/data.json"
    );

    if (!response.ok) {
      throw new Error("Fetching Failed!");
    }
    fetchedData = await response.json();
    return fetchedData;
  } catch (error) {
    errorOrNormalMessageContainer(`Error fetching data: ${error.message}`);
  } finally {
    if (fetchedData && Array.isArray(fetchedData) && fetchedData.length > 0) {
      errorOrNormalMessageContainer("All Set: Data successfully loaded!");
    } else {
      errorOrNormalMessageContainer(
        "ERROR: Oops! Something went wrong while fetching the data."
      );
    }
  }
}

(async function () {
  fetchedQuizData = await fetchQuizData();
})();
