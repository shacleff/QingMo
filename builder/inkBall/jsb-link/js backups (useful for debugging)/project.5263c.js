window.__require = function t(e, i, o) {
function n(a, s) {
if (!i[a]) {
if (!e[a]) {
var r = a.split("/");
r = r[r.length - 1];
if (!e[r]) {
var l = "function" == typeof __require && __require;
if (!s && l) return l(r, !0);
if (c) return c(r, !0);
throw new Error("Cannot find module '" + a + "'");
}
}
var h = i[a] = {
exports: {}
};
e[a][0].call(h.exports, function(t) {
return n(e[a][1][t] || t);
}, h, h.exports, t, e, i, o);
}
return i[a].exports;
}
for (var c = "function" == typeof __require && __require, a = 0; a < o.length; a++) n(o[a]);
return n;
}({
DATA: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "613ecw7hmROK6+Tfk3XeqdE", "DATA");
cc.Class({
extends: cc.Component,
properties: {},
init: function() {
this.score = 0;
this.brickNum = 40;
},
addScore: function(t) {
this.score += t;
},
subBrick: function() {
this.brickNum--;
},
addBrick: function(t) {
this.brickNum += t;
}
});
cc._RF.pop();
}, {} ],
bg: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "8957bCbWd5OXYOWJIQzHFoY", "bg");
cc.Class({
extends: cc.Component,
properties: {
updateRate: .004
},
onLoad: function() {
this.i = Math.floor(100 * Math.random());
},
start: function() {},
update: function(t) {
1;
this.i += this.updateRate;
var e = 36.5 * Math.sin(this.i) + 173.5, i = 36.5 * Math.sin(this.i + this.i / 3) + 173.5, o = 36.5 * Math.sin(this.i + 1) + 173.5;
this.node.color = new cc.color(e, i, o);
}
});
cc._RF.pop();
}, {} ],
bottomBrickArea: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "5711fDfTCtNU4m10VJiujMf", "bottomBrickArea");
cc.Class({
extends: cc.Component,
properties: {
brick: {
default: null,
type: cc.Node
},
space: 10,
brickNum: 0
},
genBrick: function(t) {
for (var e = new Array(), i = 0; i < t; i++) {
e[i] = null;
e[i] = cc.instantiate(this.brick);
e[i].active = !0;
e[i].parent = this.node;
var o = Math.floor((this.node.width + this.space) / (e[i].width + this.space));
e[i].x = (e[i].width + this.space) * (i % o) + .5 * e[i].width;
e[i].y = -((e[i].height + this.space) * Math.floor(i / o) + .5 * e[i].height);
var n = cc.moveBy(2, 0, 200);
e[i].runAction(n);
}
},
destroyBrick: function() {
var t = new Array();
t = this.node.children;
for (var e = 0; e < 20; e++) void 0 !== t[e] && t[e].destroy();
}
});
cc._RF.pop();
}, {} ],
brick: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "2f16eWgVlhDhqqnq88WO5E1", "brick");
cc.Class({
extends: cc.Component,
properties: {
brickLife: 1,
brick1: {
default: null,
type: cc.SpriteFrame
},
brick2: {
default: null,
type: cc.SpriteFrame
},
brick3: {
default: null,
type: cc.SpriteFrame
},
brick4: {
default: null,
type: cc.SpriteFrame
},
waterAudio1: {
default: null,
type: cc.AudioClip
},
waterAudio2: {
default: null,
type: cc.AudioClip
},
waterAudio3: {
default: null,
type: cc.AudioClip
},
waterAudio4: {
default: null,
type: cc.AudioClip
}
},
onLoad: function() {
null != this && this.changeColor();
},
start: function() {},
update: function(t) {
var e = this;
if (this.node.y <= -520) {
this.getComponent(cc.RigidBody).type = 2;
setTimeout(function() {
null !== e.node && e.node.destroy();
}, 1e4);
}
},
onBeginContact: function(t, e, i) {
switch (i.tag) {
case 12:
i.node.destroy();

case 10:
this.audioEffectPlay();
this.node.dispatchEvent(new cc.Event.EventCustom("hitBrick", !0));
this.brickLife--;
this.changeColor();
break;

case 7:
this.node.dispatchEvent(new cc.Event.EventCustom("hitBrick", !0));
this.node.destroy();
break;

case 6:
this.node.destroy();
}
},
changeColor: function() {
var t = this, e = function(e, i) {
null != t.node && (t.node.getComponent(cc.Sprite).spriteFrame = i);
};
switch (this.brickLife) {
case 0:
this.node.destroy();
break;

case 1:
cc.loader.loadRes("brick1", cc.SpriteFrame, e);
break;

case 2:
cc.loader.loadRes("brick2", cc.SpriteFrame, e);
break;

case 3:
cc.loader.loadRes("brick3", cc.SpriteFrame, e);
break;

case 4:
cc.loader.loadRes("brick4", cc.SpriteFrame, e);
break;

case 5:
this.node.dispatchEvent(new cc.Event.EventCustom("genBottomBrick", !0));
this.node.destroy();
break;

default:
cc.loader.loadRes("brick-5", cc.SpriteFrame, e);
}
},
audioEffectPlay: function() {
switch (Math.floor(4 * Math.random())) {
case 0:
cc.audioEngine.play(this.waterAudio1, !1, .8);
break;

case 1:
cc.audioEngine.play(this.waterAudio2, !1, .8);
break;

case 2:
cc.audioEngine.play(this.waterAudio3, !1, .8);
break;

case 3:
cc.audioEngine.play(this.waterAudio4, !1, .8);
}
}
});
cc._RF.pop();
}, {} ],
bulletBrick: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "ee607FIn/xOiaptFkbBPVBs", "bulletBrick");
cc.Class({
extends: cc.Component,
properties: {
onHit: !1
},
onLoad: function() {},
start: function() {},
onCollisionEnter: function(t, e) {
switch (t.tag) {
case 10:
this.onHit = !0;
break;

case 1:
this.node.dispatchEvent(new cc.Event.EventCustom("bullet", !0));
this.node.destroy();
break;

case 6:
this.node.destroy();
break;

default:
console.log("hit_tag", t.tag, t.name);
}
},
update: function(t) {
var e = this;
if (!0 === this.onHit) {
this.onHit = !1;
this.getComponent(cc.RigidBody).type = 2;
}
if (this.node.y <= -520) {
this.getComponent(cc.RigidBody).type = 2;
setTimeout(function() {
null !== e.node && e.node.destroy();
}, 1e4);
}
}
});
cc._RF.pop();
}, {} ],
clearBullet: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "0c57bIimBtLgZ1EBOeDo0uO", "clearBullet");
cc.Class({
extends: cc.Component,
properties: {},
onBeginContact: function(t, e, i) {
12 === i.tag && i.node.destroy();
},
start: function() {}
});
cc._RF.pop();
}, {} ],
coverBg: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "9dca4wh3bNFfaGsUsuKEzgy", "coverBg");
cc.Class({
extends: cc.Component,
properties: {},
backToMenu: function() {
cc.director.loadScene("menu");
},
init: function() {
this.node.opacity = 0;
this.node.getChildByName("score").opacity = 0;
this.node.active = !1;
},
share: function() {
wx.shareAppMessage({
title: "我要分享",
success: function(t) {
console.log("拉起分享 成功");
console.log(t);
},
fail: function(t) {
console.log("拉起分享 失败");
console.log(t);
}
});
},
gameOver: function(t) {
var e = this;
console.log(t);
var i = this.node.getChildByName("score");
i.getComponent(cc.Label).string = t;
this.node.active = !0;
setTimeout(function() {
var t = cc.fadeIn(2);
e.node.runAction(t);
}, 1e3);
i.opacity = 255;
}
});
cc._RF.pop();
}, {} ],
gameControl: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "e772ejAcwJML4mhAlaWw5XJ", "gameControl");
var o = r(t("bottomBrickArea")), n = r(t("generateBrick")), c = r(t("movePlat")), a = r(t("coverBg")), s = r(t("DATA"));
function r(t) {
return t && t.__esModule ? t : {
default: t
};
}
cc.Class({
extends: cc.Component,
properties: {
moveBall: t("moveBall"),
bottomBrick: o.default,
movePlat: c.default,
genBrick: n.default,
data: s.default,
cover: a.default,
score: {
type: cc.Label,
default: null
},
gameOverAudio: {
default: null,
type: cc.AudioClip
}
},
onLoad: function() {
cc.winSize.width / cc.winSize.height > .6 ? this.getComponent(cc.Canvas).fitHeight = !0 : this.getComponent(cc.Canvas).fitHeight = !1;
console.log(cc.winSize.width / cc.winSize.height, this.getComponent(cc.Canvas).fitHeight);
cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, function(t) {
t.keyCode === cc.KEY.back && cc.director.end();
});
this.gameStart();
},
init: function() {
cc.director.getPhysicsManager().enabled = !0;
cc.director.getCollisionManager().enabled = !0;
this.data.init();
this.cover.init();
this.score.string = this.data.score;
this.genBrick.init(this.data.brickNum);
this.moveBall.init(600);
this.movePlat.init();
this.node.on("ballShot", this.ballShot, this);
this.node.on("hitBrick", this.onHit, this);
this.node.on("superBall", this.superBall, this);
this.node.on("bullet", this.bullet, this);
this.node.on("genBottomBrick", this.genBottomBrick, this);
this.node.on("gameOver", this.gameOver, this);
},
gameStart: function() {
this.init();
},
onHit: function() {
this.data.addScore(1);
this.data.subBrick();
this.score.string = this.data.score;
var t = 100 * Math.log2(3 * this.data.score + 45) + 50;
this.moveBall.speedUp(t);
},
ballShot: function() {
var t = this;
setTimeout(function() {
t.genTimer = setInterval(function() {
t.genBrick.genBrick(10, t.data.score);
}, 8e3);
}, 4e3);
this.moveTimer = setInterval(function() {
t.genBrick.brickMove();
}, 8e3);
this.movePlat.isBallShot = !0;
},
ballAct: function() {},
superBall: function() {
this.moveBall.superBall();
this.genBrick.superBallActivate();
},
bullet: function() {
var t = this;
this.movePlat.bubbleBrick();
clearInterval(this.shootBullet);
this.movePlat.allowRotate = !0;
this.shootBullet = setInterval(function() {
t.movePlat.shootBullet();
}, 1e3);
setTimeout(function() {
clearInterval(t.shootBullet);
t.movePlat.allowRotate = !0;
}, 28e3);
},
genBottomBrick: function() {
this.bottomBrick.destroyBrick();
this.bottomBrick.genBrick(10);
},
gameOver: function() {
cc.audioEngine.play(this.gameOverAudio, !1, 1);
cc.director.getPhysicsManager().enabled = !1;
cc.director.getCollisionManager().enabled = !1;
this.bottomBrick.destroyBrick();
this.genBrick.gameOver();
this.movePlat.gameOver();
this.moveBall.gameOver();
clearInterval(this.genTimer);
clearInterval(this.moveTimer);
clearInterval(this.shootBullet);
this.movePlat.isBallShot = !1;
this.cover.gameOver(this.data.score);
this.node.off("ballShot", this.activatPlat, this);
this.node.off("hitBrick", this.onHit, this);
this.node.off("superBall", this.superBall, this);
this.node.off("genBottomBrick", this.genBottomBrick, this);
this.node.off("gameOver", this.gameOver, this);
}
});
cc._RF.pop();
}, {
DATA: "DATA",
bottomBrickArea: "bottomBrickArea",
coverBg: "coverBg",
generateBrick: "generateBrick",
moveBall: "moveBall",
movePlat: "movePlat"
} ],
generateBrick: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "cc06diF+fhMeqCbK3gHOKi6", "generateBrick");
cc.Class({
extends: cc.Component,
properties: {
space: 10,
brickNum: 0,
brick: {
default: null,
type: cc.Node
},
superBall: {
default: null,
type: cc.Node
},
shield: {
default: null,
type: cc.Node
},
bullet: {
default: null,
type: cc.Node
},
c: 0
},
onLoad: function() {},
init: function(t) {
this.brickNum = t;
this.genBrick(this.brickNum, 0);
},
start: function() {
this.node.on("unuse", function(t) {
console.log(t);
}, this);
},
genBrick: function(t, e) {
var i = this, o = new Array(), n = 60, c = 20, a = 10, s = 0;
s = 8;
e > 1 && (s = 4);
if (e < 150) {
n = .1 * -e + 80;
c = .1 * e + 15;
} else if (e > 150 && e < 400) {
console.log("in");
c = 30;
n = .1 * -e + 80;
a = .06 * (e - 150) + 5;
s = 2;
} else {
n = 40;
c = 30;
a = 20;
s = 1.5;
}
a += c += n;
for (var r = function(t) {
var e = 100 * Math.random(), r = function(e) {
o[t] = cc.instantiate(i.brick);
o[t].getComponent("brick").brickLife = e;
}, l = Math.floor(4 * Math.random());
if (e < s) switch (l) {
case 0:
o[t] = cc.instantiate(i.superBall);
break;

case 1:
r(Math.floor(3 * Math.random() + 1));
var h = cc.instantiate(i.shield);
o[t].parent = i.node;
h.parent = o[t];
h.active = !0;
break;

case 2:
o[t] = cc.instantiate(i.bullet);
break;

case 3:
r(9);
break;

default:
r(1);
} else r(e >= s && e < n ? 1 : e >= n && e < c ? 2 : e >= c && e < a ? 3 : e >= a && e < 100 ? 4 : 1);
var d = Math.floor((i.node.width + i.space) / (o[t].width + i.space));
o[t].x = (o[t].width + i.space) * (t % d) + .5 * o[t].width;
o[t].y = -((o[t].height + i.space) * Math.floor(t / d) - .5 * o[t].height);
o[t].active = !0;
o[t].parent = i.node;
}, l = 0; l < t; l++) r(l);
},
superBallActivate: function() {
var t = new Array();
t = this.node.children;
for (var e = function(e) {
if (void 0 === t[e]) {
console.log(e);
console.log("break");
return "break";
}
if (!1 !== t[e].active) switch (t[e].name) {
case "brick":
t[e].getComponent(cc.RigidBody).gravityScale = 0;
t[e].getComponent(cc.RigidBody).type = 2;
setTimeout(function() {
if (null !== t[e] && void 0 !== t[e]) {
t[e].getComponent(cc.RigidBody).type = 0;
t[e].getComponent(cc.RigidBody).gravityScale = 1;
}
}, 8e3);
break;

case "superBallBrick":
case "shieldBrick":
break;

default:
t[e].name;
} else console.log(t[e].name, e, "not active");
}, i = 0; i < 120; i++) {
if ("break" === e(i)) break;
}
},
brickMove: function() {
var t = new Array();
t = this.node.children;
for (var e = 0; e < t.length; e++) if (null !== t[e] && void 0 !== t[e]) {
var i = cc.moveBy(1, 0, -70);
t[e].runAction(i);
} else console.log("brick_move nil brick genbrick 172");
},
brickPause: function() {
this.unscheduleAllCallbacks();
},
gameOver: function() {
clearInterval(this.genTimer);
var t = new Array();
t = this.node.children;
for (var e = 0; e < 120; e++) void 0 !== t[e] && t[e].destroy();
}
});
cc._RF.pop();
}, {} ],
moveBall: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "db68cLyTehE2r4h71peTalc", "moveBall");
cc.Class({
extends: cc.Component,
properties: {
isBallMove: !1,
ballLife: 2,
ballSpeed: 0,
onHit: !1,
bubble: {
type: cc.Node,
default: null
},
ballLifeSubAudio: {
default: null,
type: cc.AudioClip
}
},
init: function(t) {
this.ballSpeed = t;
this.ballLife = 2, this.node.position = cc.v2(0, -310);
this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
this.node.parent.on(cc.Node.EventType.TOUCH_START, this.lineMove, this);
this.node.parent.on(cc.Node.EventType.TOUCH_MOVE, this.lineMove, this);
this.node.parent.on(cc.Node.EventType.TOUCH_END, this.ballMove, this);
this.node.parent.on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this);
this.node.getChildByName("shield").active = !0;
this.node.getChildByName("motionStreak").active = !1;
},
start: function() {},
update: function(t) {},
onBeginContact: function(t, e, i) {
switch (i.tag) {
case 6:
this.ballLife--;
if (0 === this.ballLife) {
this.isBallMove = !1;
this.node.dispatchEvent(new cc.Event.EventCustom("gameOver", !0));
} else if (1 === this.ballLife) {
this.node.getChildByName("shield").active = !1;
this.node.getChildByName("motionStreak").active = !0;
this.bubbleBrick();
cc.audioEngine.play(this.ballLifeSubAudio);
} else if (2 === this.ballLife) {
this.node.getChildByName("shield1").active = !1;
this.bubbleBrick();
cc.audioEngine.play(this.ballLifeSubAudio);
}
break;

case 4:
i.node.destroy();
break;

case 5:
if (1 === this.ballLife) {
this.node.getChildByName("shield").active = !0;
this.node.getChildByName("motionStreak").active = !1;
this.ballLife++;
} else if (2 === this.ballLife) {
this.node.getChildByName("shield1").active = !0;
this.ballLife++;
}
}
},
lineMove: function(t) {
var e = this.node.getChildByName("shootLine");
e.active = !0;
var i = t.getLocation(), o = this.node.convertToNodeSpaceAR(i), n = Math.atan2(o.x, o.y) / Math.PI * 180;
o.y > 0 && (e.rotation = n);
e.opacity = 255;
},
ballMove: function(t) {
var e = this.node.getChildByName("shootLine");
e.opacity = 0;
var i = t.getLocation(), o = this.node.convertToNodeSpaceAR(i), n = Math.atan2(o.y, o.x), c = this.ballSpeed * Math.cos(n), a = this.ballSpeed * Math.sin(n);
if (o.y > 0 && !this.isBallMove) {
e.active = !1;
this.getComponent(cc.RigidBody).linearVelocity = cc.v2(c, a);
this.isBallMove = !0;
this.node.dispatchEvent(new cc.Event.EventCustom("ballShot", !0));
this.node.parent.off(cc.Node.EventType.TOUCH_START, this.lineMove, this);
this.node.parent.off(cc.Node.EventType.TOUCH_MOVE, this.lineMove, this);
this.node.parent.off(cc.Node.EventType.TOUCH_END, this.ballMove, this);
}
},
touchCancel: function() {
this.node.getChildByName("shootLine").opacity = 0;
},
speedUp: function(t) {
this.ballSpeed = t;
var e = this.getComponent(cc.RigidBody).linearVelocity, i = Math.atan2(e.y, e.x), o = this.ballSpeed * Math.cos(i), n = this.ballSpeed * Math.sin(i);
this.getComponent(cc.RigidBody).linearVelocity = cc.v2(o, n);
},
superBall: function() {
var t = this;
console.log("transform!");
this.node.getChildByName("superBall").active = !0;
this.getComponent(cc.PhysicsCircleCollider).tag = 11;
setTimeout(function() {
t.node.getChildByName("superBall").active = !1;
t.getComponent(cc.PhysicsCircleCollider).tag = 10;
}, 8e3);
},
bubbleBrick: function() {
var t = cc.instantiate(this.bubble);
t.parent = this.node;
t.x = 0;
t.y = 0;
var e = 1e3 * Math.random() - 500, i = 1e3 * Math.random() - 500, o = cc.v2(e, i);
t.getComponent(cc.RigidBody).linearVelocity = o;
t.active = !0;
setTimeout(function() {
t.destroy();
}, 1500);
},
gameOver: function() {
this.node.getChildByName("superBall").active = !1;
this.node.getChildByName("shield1").active = !1;
}
});
cc._RF.pop();
}, {} ],
movePlat: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "3c34er3pZtK77ysWxYg1BEG", "movePlat");
cc.Class({
extends: cc.Component,
properties: {
isBallShot: !1,
allowRotate: !0,
bulletNum: 0,
bullet: {
default: null,
type: cc.Node
},
bubble: {
type: cc.Node,
default: null
}
},
init: function() {
this.isBallShot = !1;
this.node.x = 0;
this.node.y = -335;
this.node.rotation = 0;
this.node.parent.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
},
start: function() {},
onTouchMove: function(t) {
var e = t.getLocation(), i = this.node.parent.convertToNodeSpaceAR(e), o = this.node.convertToNodeSpaceAR(e), n = t.getDelta(), c = cc.winSize.width / 2 - this.node.width / 2;
this.isBallShot && o.y < 0 && (this.node.x < c && n.x > 0) | (this.node.x > -c && n.x < 0) && (this.node.x += n.x);
this.isBallShot && this.allowRotate && i.x > this.node.x && i.y > this.node.y + 10 && (this.node.rotation < -.6 && n.y < 0) | (this.node.rotation > -45 && n.y > 0) ? this.node.rotation -= n.y / 5 : this.isBallShot && this.allowRotate && i.x < this.node.x && i.y > this.node.y + 10 && (this.node.rotation > .6 && n.y < 0) | (this.node.rotation < 45 && n.y > 0) && (this.node.rotation += n.y / 5);
},
shootBullet: function() {
this.rotation = 0;
var t = cc.instantiate(this.bullet);
t.parent = this.node;
t.x = -40;
t.y = 20;
t.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 500);
t.active = !0;
var e = cc.instantiate(this.bullet);
e.parent = this.node;
e.x = 40;
e.y = 20;
e.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 500);
e.active = !0;
this.allowRotate = !1;
},
bubbleBrick: function() {
var t = cc.instantiate(this.bubble);
t.parent = this.node;
t.x = 0;
t.y = 0;
var e = 1e3 * Math.random() - 500, i = 1e3 * Math.random() - 500, o = cc.v2(e, i);
t.getComponent(cc.RigidBody).linearVelocity = o;
t.active = !0;
setTimeout(function() {
t.destroy();
}, 1500);
},
gameOver: function() {
var t = new Array();
t = this.node.children;
for (var e = 0; e < 10; e++) void 0 !== t[e] ? t[e].destroy() : console.log("0");
}
});
cc._RF.pop();
}, {} ],
play: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "442e8C9XslKdZoDCiU4WZ8b", "play");
cc.Class({
extends: cc.Component,
properties: {
startAudio: {
default: null,
type: cc.AudioClip
}
},
onLoad: function() {},
start: function() {},
play: function() {
cc.audioEngine.play(this.startAudio);
cc.director.loadScene("game");
}
});
cc._RF.pop();
}, {} ],
resolution: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "b7f3aiZJpVCHogaI41kb6d9", "resolution");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
this.node.y = (1280 - cc.winSize.height) / 2;
},
start: function() {}
});
cc._RF.pop();
}, {} ],
shieldBrick: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "da5f72ZluREvaNnFr0BhOfy", "shieldBrick");
cc.Class({
extends: cc.Component,
properties: {
brick: {
type: cc.Node,
default: null
}
},
onLoad: function() {},
start: function() {
this.node.width = 64;
this.node.height = 64;
this.node.parent.width = 37;
this.node.parent.height = 37;
this.node.x = 0;
this.node.y = 0;
this.brick = this.node.parent;
this.node.parent = this.node.parent.parent;
},
onBeginContact: function(t, e, i) {
if (null !== this.brick && !0 === this.brick.active) {
this.brick.width = 60;
this.brick.height = 60;
}
this.node.destroy();
},
onDestroy: function() {},
update: function(t) {
var e = this;
if (this.node.y <= -520) {
this.getComponent(cc.RigidBody).type = 2;
setTimeout(function() {
null !== e.node && e.node.destroy();
}, 1e4);
}
}
});
cc._RF.pop();
}, {} ],
superBallBrick: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "e645e97nfhLDbFF6ecJaWBO", "superBallBrick");
cc.Class({
extends: cc.Component,
properties: {
onHit: !1
},
onLoad: function() {},
start: function() {},
onCollisionEnter: function(t, e) {
switch (t.tag) {
case 12:
t.node.destroy();

case 10:
this.onHit = !0;
break;

case 1:
console.log(e.tag);
3 === e.tag ? this.node.dispatchEvent(new cc.Event.EventCustom("superBall", !0)) : 7 === e.tag && this.node.dispatchEvent(new cc.Event.EventCustom("bullet", !0));
this.node.destroy();
break;

case 6:
this.node.destroy();
break;

default:
console.log("hit_tag", t.tag, t.name);
}
},
update: function(t) {
var e = this;
if (!0 === this.onHit) {
this.onHit = !1;
this.getComponent(cc.RigidBody).type = 2;
}
if (this.node.y <= -520) {
this.getComponent(cc.RigidBody).type = 2;
setTimeout(function() {
null !== e.node && e.node.destroy();
}, 1e4);
}
}
});
cc._RF.pop();
}, {} ]
}, {}, [ "bottomBrickArea", "brick", "bulletBrick", "generateBrick", "shieldBrick", "superBallBrick", "clearBullet", "DATA", "gameControl", "coverBg", "bg", "play", "moveBall", "movePlat", "resolution" ]);