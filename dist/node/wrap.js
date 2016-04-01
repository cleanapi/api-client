var Wrap, assign, constants, http, isObject;

assign = require('lodash/assign');

constants = require('./constants');

isObject = require('lodash/isObject');

http = require('./http');

Wrap = (function() {
  function Wrap(resource, _client) {
    this._client = _client;
    assign(this, resource);
    this._wrapUrl = this._client.baseUrl + "/wraps/" + this.id;
  }

  Wrap.prototype._createCardMap = function(sourceCards, targetCards) {
    var cardMap;
    cardMap = {};
    sourceCards.forEach(function(card, index) {
      return cardMap[card.id] = targetCards[index].id;
    });
    return cardMap;
  };

  Wrap.prototype._convertSchemaMapToCards = function(schemaMap) {
    var id, results, schema;
    results = [];
    for (id in schemaMap) {
      schema = schemaMap[id];
      results.push({
        id: id,
        schema: schema
      });
    }
    return results;
  };

  Wrap.prototype._assignTargetIds = function(sourceCards, targetCards) {
    var card, cardMap, i, len;
    cardMap = this._createCardMap(this.cards, targetCards);
    for (i = 0, len = sourceCards.length; i < len; i++) {
      card = sourceCards[i];
      card.id = cardMap[card.id];
    }
    return sourceCards;
  };

  Wrap.prototype._convertCardsToSchemaMap = function(cards) {
    var cardMap;
    cardMap = {};
    cards.forEach(function(card, index) {
      return cardMap[card.id] = card.schema;
    });
    return cardMap;
  };

  Wrap.prototype._createPersonalizedWrap = function(body) {
    return http.post(this._wrapUrl + "/personalize", {
      headers: this._client.getAuthHeader(),
      body: body
    }).then((function(_this) {
      return function(wrap) {
        return new Wrap(wrap, _this._client);
      };
    })(this));
  };

  Wrap.prototype.listPersonalized = function(search) {
    return http.get(this._wrapUrl + "/personalize", {
      headers: this._client.getAuthHeader(),
      search: search
    }).then((function(_this) {
      return function(wraps) {
        return wraps.map(function(wrap) {
          return new Wrap(wrap, _this._client);
        });
      };
    })(this));
  };

  Wrap.prototype.createPersonalized = function(schemaMap, tags) {
    return this._client.getWrap(this.id, {
      published: true
    }).then((function(_this) {
      return function(publishedWrap) {
        var body, cards;
        body = {
          tags: tags
        };
        if (isObject(schemaMap)) {
          cards = _this._convertSchemaMapToCards(schemaMap);
          cards = _this._assignTargetIds(cards, publishedWrap.cards);
          body.personalized_json = _this._convertCardsToSchemaMap(cards);
        } else {
          body.url = schemaMap;
        }
        return _this._createPersonalizedWrap(body);
      };
    })(this));
  };

  Wrap.prototype.deletePersonalized = function(body) {
    return http["delete"](this._wrapUrl + "/personalize", {
      headers: this._client.getAuthHeader(),
      body: body
    });
  };

  Wrap.prototype.share = function(mobileNumber, body) {
    return http.get(this._wrapUrl + "/share", {
      headers: this._client.getAuthHeader(),
      search: {
        type: constants.MESSAGE_SERVICES.SMS,
        phone_number: mobileNumber,
        body: body
      }
    });
  };

  return Wrap;

})();

module.exports = Wrap;
