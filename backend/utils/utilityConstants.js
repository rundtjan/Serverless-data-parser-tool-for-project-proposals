const companyIdentityTypes = ['oy', 'ky', 'oyj', 'ay', 'osk', 'aoy', 't:mi', 'tmi', 'ab', 'abp', 'kb', 'co', 'ltd']
const particles = ['josko', 'kuin', 'niin', 'vaan', 'sillä', 'paitsi', 'jollei', 'ettei', 'jotta', 'vaikka', 'jos', 'ellei', 'koska', 'silloin', 'että', 'eli', 'elikkä', 'joko', 'mikäli', 'kun', 'vai', 'mutta', 'etteikö', 'kuten', 'tai', 'sekä', 'ja']
// following list from https://kaino.kotus.fi/sanat/taajuuslista/parole.php
const top_freq_words = ['ja', 'on', 'ei', 'että', 'oli', 'se', 'hän', 'mutta', 'ovat', 'kuin', 'myös', 'kun', 'ole', 'sen', 'tai', 'joka', 'niin', 'mukaan', 'jo', 'vain', 'ollut', 'jos', 'nyt', 'olisi', 'voi', 'hänen', 'sitä', 'suomen', 'vielä', 'sekä', 'sitten', 'siitä', 'kanssa', 'kuitenkin', 'vuoden', 'jälkeen', 'olla', 'eivät', 'viime', 'mitä',
  'vaikka', 'ne', 'vuonna', 'kaikki', 'sillä', 'koko', 'jotka', 'eikä', 'tämä', 'ennen', 'noin', 'jonka', 'olivat', 'minä', 'en', 'sanoo', 'sanoi', 'hyvin', 'tulee', 'paljon', 'saa', 'koska', 'ettei', 'jossa', 'he', 'vaan', 'pitää', 'yli', 'lisäksi', 'tämän', 'mitään', 'aina', 'eli', 'siihen', 'esimerkiksi', 'siinä', 'itse', 'aikana', 'enää', 'yksi', 
  'miten', 'ensi', 'enemmän', 'juuri', 'sai', 'näin', 'olen', 'tässä', 'mikä', 'taas', 'eri', 'silloin', 'kuten', 'ainakin', 'niitä', 'niiden', 'lähes', 'voidaan', 'osa', 'kertoo', 'yhtä', 'kyllä', 'vasta', 'hyvä', 'jopa', 'aivan', 'ehkä', 'kolme', 'samalla', 'edes', 'ilman', 'tällä', 'mukana', 'me', 'yhä', 'olevan', 'pitäisi', 'vähän', 'kuitenkaan',
  'kerran', 'saanut', 'heidän', 'siis', 'siellä', 'jota', 'aika', 'edelleen', 'maan', 'kautta', 'pois', 'saada', 'kertaa', 'tullut', 'antaa', 'voisi', 'muuta', 'tähän', 'tänä', 'kuinka', 'vuoksi', 'aikaan', 'usein', 'olin', 'kuuluu', 'tätä', 'kertoi', 'suuri', 'tavalla', 'olleet', 'onko', 'häntä', 'missä', 'lisää', 'koskaan', 'uutta', 'ottaa', 'alkoi',
  'alkaa', 'piti', 'joku', 'välillä']
const co_Set = new Set(companyIdentityTypes)
const fillerWords = new Set(particles.concat(top_freq_words))

module.exports = {co_Set, fillerWords}