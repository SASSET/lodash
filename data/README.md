## Data/MetaData Files

| **File**    | **Description**  | **Dependencies**  | **Size** | **Notes**  |
|----------------------|--------------------------------------------------------|---------------------|---|---|
| [**censored.json**](censored.json)       | "Naughty" words                            | `_.censor()`        | 5.1**K** | All values are Base64 encoded  |
| [**ciphermap.json**](ciphermap.json)     | Cipher stuff                               |                     | 2.5**K** | |
| [**en-words.json**](en-words.json)       | Full list of words in the English language | `_.isEnglishWord()` | 3.2**M** | |
| [**uncountable.json**](uncountable.json) | List of words that are _not_ countable     | `_.isCountable()`   | 3.1**K** | |