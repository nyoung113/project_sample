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
  _findtitle = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(title) {
    var totplans;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _TotPlan.TotPlan.findOne({
              title: title
            }).lean();

          case 2:
            totplans = _context5.sent;
            return _context5.abrupt("return", totplans);

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _findtitle.apply(this, arguments);
}

function finduserPlan(_x2) {
  return _finduserPlan.apply(this, arguments);
}

function _finduserPlan() {
  _finduserPlan = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(id) {
    var usertotplan;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _TotPlan.TotPlan.findOne({
              _id: id
            }).lean();

          case 2:
            usertotplan = _context6.sent;
            return _context6.abrupt("return", usertotplan);

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _finduserPlan.apply(this, arguments);
}

function finduser(_x3) {
  return _finduser.apply(this, arguments);
}

function _finduser() {
  _finduser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(gmail) {
    var usertotplan;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _User.User.findOne({
              gmail: gmail
            }).lean();

          case 2:
            usertotplan = _context7.sent;
            return _context7.abrupt("return", usertotplan);

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
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
    var id, gmail, usertotplan, totplan_title, totplan_id, hostname, insert_plan, insert_host, par_userinfo, par_id, par_name, par_info, hostarr;
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
            insert_plan = {
              _id: totplan_id,
              title: totplan_title
            };
            insert_host = {
              host: hostname,
              plan_title: totplan_title
            }; // 초대장을 받음

            _context2.next = 13;
            return finduser(gmail);

          case 13:
            par_userinfo = _context2.sent;
            console.log("초대한 유저", par_userinfo);
            par_id = par_userinfo._id;
            par_name = par_userinfo.name;
            par_info = {
              _id: par_id,
              name: par_name
            }; //  user(참가자)의 totplan_list추가(totplan_id, totplan.name)
            //  user(참가자)의 calllist 추가(host, plantitle)

            hostarr = par_userinfo.call_list;

            if (checkcall(hostarr, totplan_title)) {
              console.log("이미 초대됨");
            } else {
              _User.User.findOne({
                gmail: gmail
              }).exec(function (err, res) {
                if (res) {
                  res.totPlan_list.push(insert_plan);
                  res.call_list.push(insert_host);
                  res.save();
                }
              }); // 초대 수락시
              // tot_plan participant추가


              _TotPlan.TotPlan.findOne({
                _id: totplan_id
              }).exec(function (err, res) {
                if (res) {
                  res.participants.push(par_info);
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

            if (checkath(parti, req.session.user._id)) {
              res.render("edit-plan", {
                user: req.session.user,
                totPlan: usertotplan,
                map_cl: process.env.MAP_CLIENT
              });
            } else {
              res.redirect("/users/".concat(res.session.user._id));
            } // 진행중


          case 9:
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
    var _req$body, title, start, end, startDate, endDate, pC_id, pC_user, tempDate, dayArray, totplanidcall, totplanid, totplan;

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
            tempDate = new Date(startDate);
            dayArray = [];
            _context4.next = 10;
            return new _TotPlan.TotPlan({
              title: title,
              admin: {
                _id: pC_id,
                name: pC_user
              },
              participants: [{
                _id: pC_id,
                name: pC_user
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

          case 10:
            _context4.next = 12;
            return findtitle(title);

          case 12:
            totplanidcall = _context4.sent;
            totplanid = totplanidcall._id;
            console.log(totplanid);

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

            _context4.next = 18;
            return findtitle(title);

          case 18:
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
            res.redirect("/users/".concat(pC_id));

          case 22:
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

var accept = function accept(req, res) {
  //***DB
  res.redirect("/users/".concat(req.session.user._id));
};

exports.accept = accept;

var refuse = function refuse(req, res) {
  //***DB
  res.redirect("/users/".concat(req.session.user._id));
}; // admin만 삭제 가능하게 만들어야 함 아직 작업 x


exports.refuse = refuse;

var del = function del(req, res) {
  return res.send("delete plans");
};

exports.del = del;