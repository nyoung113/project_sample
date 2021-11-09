"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendInvitation = exports.seePlan = exports.refuse = exports.postCreatePlan = exports.getCreatePlan = exports.editPlan = exports.del = exports.accept = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _TotPlan = require("../models/TotPlan");

var _User = require("../models/User");

_dotenv["default"].config(); //goes to plan router


var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

function findtitle(_x) {
  return _findtitle.apply(this, arguments);
}

function _findtitle() {
  _findtitle = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(title) {
    var totplans;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _TotPlan.TotPlan.findOne({
              title: title
            }).lean();

          case 2:
            totplans = _context8.sent;
            return _context8.abrupt("return", totplans);

          case 4:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _findtitle.apply(this, arguments);
}

function finduserPlan(_x2) {
  return _finduserPlan.apply(this, arguments);
}

function _finduserPlan() {
  _finduserPlan = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(id) {
    var usertotplan;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _TotPlan.TotPlan.findOne({
              _id: id
            }).lean();

          case 2:
            usertotplan = _context9.sent;
            return _context9.abrupt("return", usertotplan);

          case 4:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));
  return _finduserPlan.apply(this, arguments);
}

function finduser(_x3) {
  return _finduser.apply(this, arguments);
}

function _finduser() {
  _finduser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(gmail) {
    var usertotplan;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return _User.User.findOne({
              gmail: gmail
            }).lean();

          case 2:
            usertotplan = _context10.sent;
            return _context10.abrupt("return", usertotplan);

          case 4:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return _finduser.apply(this, arguments);
}

function checkath(parti, check) {
  var x = false;
  parti.forEach(function (part) {
    if (part['_id'] == check) {
      x = true;
    } else {
      return false;
    }
  });
  return x;
}

function checkcall(call, check) {
  var x = false;
  call.forEach(function (i) {
    if (i['plan_title'] == check) {
      x = true;
    } else {
      return false;
    }
  });
  return x;
}

function checktitle(tot, check) {
  var x = false;
  tot.forEach(function (i) {
    if (i['title'] == check) {
      x = true;
    } else {
      return false;
    }
  });
  return x;
} //사용자 마다 완성된 plan 보여주기 위한 것


var seePlan = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var id, usertotplan, parti;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = req.params.id; // 접근한 여행계획 데이터 조회

            _context.next = 3;
            return finduserPlan(id);

          case 3:
            usertotplan = _context.sent;
            parti = usertotplan.participants;
            console.log("접근 권한 테스트");

            if (checkath(parti, req.session.user._id)) {
              console.log("권한허용");
              res.render("see-plan", {
                user: req.session.user,
                totPlanTitles: req.session.user.totPlan_list,
                totPlan: usertotplan,
                map_cl: process.env.MAP_CLIENT
              });
            } else {
              res.redirect("/users/".concat(req.session.user._id));
            } //**DB** : => // 같은 id 값을 가지고 있는 plan 가지고 오기, user, user가 가지고 있는 plan목록, 페이지에서 보여주고 있는 total plan


          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function seePlan(_x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

exports.seePlan = seePlan;

var sendInvitation = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, gmail, usertotplan, totplan_title, totplan_id, hostname, insert_host, parti, par_userinfo, par_id, hostarr, par_tot;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // Database 작업(초대장 전송)
            id = req.params.id; //plan id

            gmail = req.body.gmail; //초대장을 보낼 이메일
            // 초대장을 전송

            _context2.next = 4;
            return finduserPlan(id);

          case 4:
            usertotplan = _context2.sent;
            console.log("초대한 계획", usertotplan);
            totplan_title = usertotplan.title;
            totplan_id = usertotplan._id;
            hostname = usertotplan.admin.name;
            insert_host = {
              host: hostname,
              plan_title: totplan_title,
              plan_id: totplan_id
            };
            parti = usertotplan.participants;
            console.log(parti); // 초대장을 받음

            _context2.next = 14;
            return finduser(gmail);

          case 14:
            par_userinfo = _context2.sent;
            console.log("초대한 유저", par_userinfo);
            par_id = par_userinfo._id;
            hostarr = par_userinfo.call_list;
            par_tot = par_userinfo.totPlan_list;

            if (checkcall(hostarr, totplan_title) || req.session.user._id == par_id || checktitle(par_tot, totplan_title)) {
              // checkath 수정필요
              console.log("이미 초대됨");
            } else {
              _User.User.findOne({
                gmail: gmail
              }).exec(function (err, res) {
                if (res) {
                  res.call_list.push(insert_host);
                  res.save();
                }
              });
            } // DB 수락 거절 판별


            res.redirect("/plans/".concat(id));

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function sendInvitation(_x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();

exports.sendInvitation = sendInvitation;

var editPlan = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var id, usertotplan, parti;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.next = 3;
            return finduserPlan(id);

          case 3:
            usertotplan = _context3.sent;
            console.log("!! userplans(editplan) check !!");
            console.log(usertotplan);
            parti = usertotplan.participants;
            console.log("접근 권한 테스트");
            console.log(req.session.user);

            if (checkath(parti, req.session.user._id)) {
              console.log("권한허용");
              res.render("edit-plan", {
                user: req.session.user,
                totPlan: usertotplan,
                map_cl: process.env.MAP_CLIENT
              });
            } else {
              res.redirect("/users/".concat(res.session.user._id));
            } // 진행중


          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function editPlan(_x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.editPlan = editPlan;

var getCreatePlan = function getCreatePlan(req, res) {
  res.render("create-plan", {
    user: req.session.user,
    totPlanTitles: req.session.user.totPlan_list
  });
};

exports.getCreatePlan = getCreatePlan;

var postCreatePlan = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _req$body, title, start, end, startDate, endDate, pC_id, pC_user, pC_image_url, tempDate, dayArray, totplanidcall, totplanid, totplan;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            // database => 새 plan 생성 뒤 user에 추가
            _req$body = req.body, title = _req$body.title, start = _req$body.start, end = _req$body.end;
            startDate = new Date(start);
            endDate = new Date(end);
            console.log("startDate : ", startDate, "endDate : ", endDate);
            pC_id = req.session.user._id;
            pC_user = req.session.user.name;
            pC_image_url = req.session.user.image_url;
            tempDate = new Date(startDate);
            dayArray = [];
            _context4.next = 11;
            return new _TotPlan.TotPlan({
              title: title,
              admin: {
                _id: pC_id,
                name: pC_user
              },
              participants: [{
                _id: pC_id,
                name: pC_user,
                image_url: pC_image_url
              }] // day_plan: [{
              //     date: dayArray,
              //     place: [{
              //         name: '아직1',
              //         road_adr: '안정함1',
              //         // img 추가할건지 판단
              //         x : 33.4724, 
              //         y : 126.3095,
              //         map_link: '이것도'
              // }]}]

            }).save().then(function () {
              console.log("totplan saved", title);
            })["catch"](function (err) {
              console.error(err);
            });

          case 11:
            _context4.next = 13;
            return findtitle(title);

          case 13:
            totplanidcall = _context4.sent;
            totplanid = totplanidcall._id;
            console.log(totplanid);

            if (!(totplanidcall.admin._id == pC_id)) {
              _context4.next = 25;
              break;
            }

            for (tempDate; tempDate <= endDate; tempDate.setDate(tempDate.getDate() + 1)) {
              console.log("temp date : ", tempDate);
              dayArray.push(new Date(tempDate));

              _TotPlan.TotPlan.findByIdAndUpdate(totplanid, {
                $push: {
                  day_plan: [{
                    date: tempDate
                  }]
                }
              }).exec();
            }

            _context4.next = 20;
            return findtitle(title);

          case 20:
            totplan = _context4.sent;

            _User.User.findByIdAndUpdate(pC_id, {
              $push: {
                totPlan_list: {
                  _id: totplan._id,
                  title: totplan.title
                }
              }
            }).exec();

            req.session.user.totPlan_list.push({
              _id: totplan._id,
              title: totplan.title
            });
            _context4.next = 26;
            break;

          case 25:
            console.log("동일한 제목의 여행이 존재합니다.");

          case 26:
            res.redirect("/users/".concat(pC_id));

          case 27:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function postCreatePlan(_x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();

exports.postCreatePlan = postCreatePlan;

var accept = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var _req$params, id, tid, accept_id, par_userinfo, usertotplan, totplan_title, totplan_id, insert_plan, hostname, insert_host, par_info;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$params = req.params, id = _req$params.id, tid = _req$params.tid;
            console.log(id);
            console.log(tid);
            accept_id = req.session.user._id;
            _context5.next = 6;
            return finduser(req.session.user.gmail);

          case 6:
            par_userinfo = _context5.sent;
            _context5.next = 9;
            return finduserPlan(id);

          case 9:
            usertotplan = _context5.sent;
            console.log("초대받은 계획", usertotplan);
            totplan_title = usertotplan.title;
            totplan_id = usertotplan._id;
            insert_plan = {
              _id: totplan_id,
              title: totplan_title
            };
            hostname = usertotplan.admin.name;
            insert_host = {
              host: hostname,
              plan_title: totplan_title,
              plan_id: totplan_id,
              _id: tid
            };
            console.log("insert host --- ");
            par_info = {
              _id: par_userinfo._id,
              name: par_userinfo.name,
              image_url: par_userinfo.image_url
            };
            console.log("par in fo  --- ");

            _TotPlan.TotPlan.findOne({
              _id: id
            }).exec(function (err, res) {
              if (res) {
                res.participants.push(par_info);
                res.save();
              }
            });

            console.log("////_@_ 3-- ");

            _User.User.findOne({
              _id: accept_id
            }).exec(function (err, res) {
              if (res) {
                res.totPlan_list.push(insert_plan);
                res.call_list.pull(insert_host);
                res.save();
              }
            });

            console.log("////_@_ --- "); // // 초대 수락시
            // tot_plan participant추가

            res.redirect("/users/".concat(req.session.user._id));

          case 24:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function accept(_x12, _x13) {
    return _ref5.apply(this, arguments);
  };
}();

exports.accept = accept;

var refuse = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var _req$params2, id, tid, refuse_id, par_userinfo, usertotplan, totplan_title, totplan_id, hostname, insert_host;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            //***DB
            _req$params2 = req.params, id = _req$params2.id, tid = _req$params2.tid;
            console.log(id);
            console.log(tid);
            refuse_id = req.session.user._id;
            _context6.next = 6;
            return finduser(req.session.user.gmail);

          case 6:
            par_userinfo = _context6.sent;
            _context6.next = 9;
            return finduserPlan(id);

          case 9:
            usertotplan = _context6.sent;
            console.log("초대받은 계획", usertotplan);
            totplan_title = usertotplan.title;
            totplan_id = usertotplan._id;
            hostname = usertotplan.admin.name;
            insert_host = {
              host: hostname,
              plan_title: totplan_title,
              plan_id: totplan_id,
              _id: tid
            };

            _User.User.findOne({
              _id: refuse_id
            }).exec(function (err, res) {
              if (res) {
                res.call_list.pull(insert_host);
                res.save();
              }
            });

            res.redirect("/users/".concat(req.session.user._id));

          case 17:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function refuse(_x14, _x15) {
    return _ref6.apply(this, arguments);
  };
}();

exports.refuse = refuse;

var del = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var id;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            //삭제할 totPlan id
            id = req.params.id;
            res.redirect("/users/".concat(req.session.user._id));

          case 2:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function del(_x16, _x17) {
    return _ref7.apply(this, arguments);
  };
}();

exports.del = del;