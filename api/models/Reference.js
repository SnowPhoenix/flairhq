/**
* Reference.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    url: {
      type: "string"
    },
    user: "string",
    user2: "string",
    gave: "string",
    got: "string",
    description: "string",
    number: {
      type: "integer",
      required: false
    },
    type: {
      type: "string",
      enum: [
        "event",
        "shiny",
        "casual",
        "bank",
        "egg",
        "giveaway",
        "involvement",
        "eggcheck",
        "misc"
      ]
    },
    // This is true if the other user has added the same url, and the trade has been approved.
    verified: "boolean",
    // This defines if the mods have approved it as a trade that can count
    approved: "boolean",
    edited: "boolean",
    notes: "string",
    privatenotes: "string",

    isEvent: function () {
      return this.type === "event";
    },

    isShiny: function () {
      return this.type === "shiny";
    },

    isCasual: function () {
      return this.type === "casual";
    },

    isEgg: function () {
      return this.type === "egg";
    },

    isBank: function () {
      return this.type === "bank";
    },

    isGiveaway: function () {
      return this.type === "giveaway";
    },

    isEggCheck: function () {
      return this.type === "eggcheck";
    },

    isMisc: function () {
      return this.type === "misc";
    }
  }
};

