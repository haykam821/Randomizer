function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.onMessageReceived = (function Version(bot, doc, user, userID, channelID, message, event) {
    require('./../Exports.js').registerCmd([['coin']], 'Flips a two-sided Bitcoin.');
        require('./../Exports.js').registerCmd([['random', 'rand'],'<min> <max>'], 'Picks a number between two integers.');

        if (message === doc.prefix + "coin"){
        var side = getRandomIntInclusive(0,1) == 0 ? "heads" : "tails"
        bot.sendMessage({
                    to: channelID,
                    message: "Your coin landed on " + side + "!"
                });
        bot.sendMessage({
                    to: doc.logchannel,
                    message: "<@" + userID + "> asked to flip a coin and it landed on ${side}."
                });
    }
    if (message.startsWith(doc.prefix+"rand ") || message.startsWith(doc.prefix+"random ")) {
        var opt = message.split(" ");
        var min = parseInt(opt[1]);
        var max = parseInt(opt[2]);
        if (!isNaN(min) && !isNaN(max)) {
            var randr = Math.floor(Math.random() * (max - min + 1) + min);
        }
        if (min === "N" && max === "α") {
            bot.sendMessage({
                to: doc.logchannel,
                message: user + " asked for a random number (" + min + " through " + max + ") and got an Easter egg."
            });
            bot.sendMessage({
                to: channelID,
                message: "Nanα. He provided the latest version of the random number picker."
            });
        } else {
            bot.sendMessage({
                to: doc.logchannel,
                message: user + " asked for a random number (" + min + " through " + max + ") and got '" + randr + "'."
            });
            bot.sendMessage({
                to: channelID,
                message: randr
            });
        }
    }
});
