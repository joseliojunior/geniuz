/**
 * @author Josélio de S. C. Júnior <joseliojrx25@gmail.com>
 * @copyright Josélio de S. C. Júnior 2021
 */

/** @param {string} str @returns {string} */
const translation = str => {
    const language = navigator.language.toLowerCase();
    return language === 'pt-br' || language === 'pt' ? str[1] : str[0];
};

const strings = {
    /** @returns {string} */
    get newGame() {
        return translation(['new game', 'novo jogo']);
    },
    /** @returns {string} */
    get gameOver() {
        return translation(['Game over', 'Fim de jogo']);
    },
    /** @returns {string} */
    get score() {
        return translation(['Score', 'Pontuação']);
    },
    /** @returns {string} */
    get lv() {
        return translation(['LV', 'NV']);
    },
    /** @returns {string} */
    get levelBonus() {
        return translation(['Level bonus', 'Bônus de nível']);
    },
    /** @returns {string} */
    get totalScore() {
        return translation(['Total score', 'Pontuação total']);
    }
};

export default strings;