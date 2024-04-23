/**
 * Formatte une date au format 'YYYY-MM-DD'.
 *
 * @param {Date} date - La date à formatter
 * @returns {string} La date formatée
 */
export const formatDate = (date) => {
  // Obtient l'année de la date
  const year = date.getFullYear();
  // Obtient le mois de la date et ajoute 1 car les mois vont de 0 à 11
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  // Obtient le jour de la date
  const day = date.getDate().toString().padStart(2, "0");
  // Retourne la date formatée
  return `${year}-${month}-${day}`;
};

/**
 * Nombre de jours dans chaque mois de l'année.
 */
export const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/**
 * Vérifie si une année est bissextile.
 *
 * @param {number} year - L'année à vérifier
 * @returns {boolean} Vrai si l'année est bissextile, sinon faux
 */
export const isLeapYear = (year) => {
  // Une année bissextile est divisible par 4 et non par 100, ou est divisible par 400
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

/**
 * Obtient le nom du mois à partir de son index.
 *
 * @param {number} monthIndex - L'index du mois (0 pour janvier, 1 pour février, etc.)
 * @returns {string} Le nom du mois
 */
export const getMonthName = (monthIndex) => {
  // Tableau des noms des mois
  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  // Retourne le nom du mois correspondant à l'index
  return months[monthIndex];
};

/**
 * Vérifie si des données existent pour un jour donné.
 *
 * @param {Object} data - Les données stockées
 * @param {string} date - La date à vérifier au format 'YYYY-MM-DD'
 * @returns {boolean} Vrai si des données existent pour la date, sinon faux
 */
export const isDataForDay = (data, date) => {
  // Vérifie si la date existe dans les données
  return data[date] !== undefined;
};

/**
 * Passe au mois suivant.
 *
 * @param {number} currentMonth - Le mois actuel (0 pour janvier, 1 pour février, etc.)
 * @param {number} currentYear - L'année actuelle
 * @param {Function} setCurrentMonth - Fonction pour mettre à jour le mois actuel
 * @param {Function} setCurrentYear - Fonction pour mettre à jour l'année actuelle
 */
export const nextMonth = (
  currentMonth,
  currentYear,
  setCurrentMonth,
  setCurrentYear
) => {
  // Si le mois actuel est décembre, passe au mois de janvier de l'année suivante
  if (currentMonth === 11) {
    setCurrentMonth(0);
    setCurrentYear(currentYear + 1);
  } else {
    // Passe simplement au mois suivant
    setCurrentMonth(currentMonth + 1);
  }
};

/**
 * Passe au mois précédent.
 *
 * @param {number} currentMonth - Le mois actuel (0 pour janvier, 1 pour février, etc.)
 * @param {number} currentYear - L'année actuelle
 * @param {Function} setCurrentMonth - Fonction pour mettre à jour le mois actuel
 * @param {Function} setCurrentYear - Fonction pour mettre à jour l'année actuelle
 */
export const prevMonth = (
  currentMonth,
  currentYear,
  setCurrentMonth,
  setCurrentYear
) => {
  // Si le mois actuel est janvier, passe au mois de décembre de l'année précédente
  if (currentMonth === 0) {
    setCurrentMonth(11);
    setCurrentYear(currentYear - 1);
  } else {
    // Passe simplement au mois précédent
    setCurrentMonth(currentMonth - 1);
  }
};
