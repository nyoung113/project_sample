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
    var userinfo;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return _User.User.findOne({
              gmail: gmail
            }).lean();

          case 2:
            userinfo = _context10.sent;
            return _context10.abrupt("return", userinfo);

          case 4:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return _finduser.apply(this, arguments);
}

function findCallList(_x4) {
  return _findCallList.apply(this, arguments);
}

function _findCallList() {
  _findCallList = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(delete_CallList) {
    var CallList_par;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return _User.User.find({}).where('call_list')["in"](delete_CallList).lean();

          case 2:
            CallList_par = _context11.sent;
            return _context11.abrupt("return", CallList_par);

          case 4:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));
  return _findCallList.apply(this, arguments);
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
}

function deletePlan(_x5) {
  return _deletePlan.apply(this, arguments);
}

function _deletePlan() {
  _deletePlan = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(id) {
    var user_DelPlan;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return _TotPlan.TotPlan.deleteOne({
              _id: id
            }).lean();

          case 2:
            user_DelPlan = _context12.sent;
            return _context12.abrupt("return", user_DelPlan);

          case 4:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));
  return _deletePlan.apply(this, arguments);
}

var seePlan = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var id, statusCode, usertotplan, parti, user_data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = req.params.id;
            statusCode = -1;

            if (req.query.status != undefined) {
              statusCode = req.query.status;
            } // 접근한 여행계획 데이터 조회


            _context.next = 5;
            return finduserPlan(id);

          case 5:
            usertotplan = _context.sent;

            if (!(usertotplan != null)) {
              _context.next = 19;
              break;
            }

            parti = usertotplan.participants;

            if (!checkath(parti, req.session.user._id)) {
              _context.next = 16;
              break;
            }

            _context.next = 11;
            return finduser(req.session.user.gmail);

          case 11:
            user_data = _context.sent;
            req.session.user = user_data;
            res.render("see-plan", {
              user: req.session.user,
              totPlanTitles: req.session.user.totPlan_list,
              totPlan: usertotplan,
              map_cl: process.env.MAP_CLIENT,
              statuscode: statusCode
            });
            _context.next = 17;
            break;

          case 16:
            // 상태코드 403       
            res.redirect("/users/".concat(req.session.user._id));

          case 17:
            _context.next = 20;
            break;

          case 19:
            // 상태코드 404
            res.redirect("/users/".concat(req.session.user._id));

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function seePlan(_x6, _x7) {
    return _ref.apply(this, arguments);
  };
}();

exports.seePlan = seePlan;

var sendInvitation = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, gmail, usertotplan, totplan_title, totplan_id, hostname, insert_host, parti, par_userinfo, statusCode, par_id, hostarr, par_tot;
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
            //console.log("초대한 계획", usertotplan)
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

            _context2.next = 13;
            return finduser(gmail);

          case 13:
            par_userinfo = _context2.sent;

            if (par_userinfo != null) {
              par_id = par_userinfo._id;
              hostarr = par_userinfo.call_list;
              par_tot = par_userinfo.totPlan_list;

              if (req.session.user._id == par_id) {
                console.log("본인에게 초대장을 보낼 수 없습니다");
                statusCode = 1; // 임의 상태코드 
              } else if (checkcall(hostarr, totplan_title) || checktitle(par_tot, totplan_title)) {
                // checkath 수정필요
                console.log("이미 초대된 회원입니다");
                statusCode = 2;
              } else {
                _User.User.findOne({
                  gmail: gmail
                }).exec(function (err, res) {
                  if (res) {
                    res.call_list.push(insert_host);
                    res.save();
                  }
                });

                statusCode = 0;
              }

              res.redirect("/plans/".concat(id, "?status=").concat(statusCode));
            } else {
              console.log("해당 이메일이 회원이 아닙니다.");
              statusCode = 3;
              res.redirect("/plans/".concat(id, "?status=").concat(statusCode));
            }

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function sendInvitation(_x8, _x9) {
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

            //console.log("!! userplans(editplan) check !!")
            //console.log(usertotplan)
            if (usertotplan == null) {
              res.redirect("/plans/".concat(id));
            } else {
              parti = usertotplan.participants;
              console.log("접근 권한 테스트");
              console.log(req.session.user);

              if (checkath(parti, req.session.user._id)) {
                console.log("권한허용");
                console.log("여행일정 참여자 목록");
                console.log(parti);
                res.render("edit-plan", {
                  user: req.session.user,
                  totPlan: usertotplan,
                  map_cl: process.env.MAP_CLIENT
                });
              } else {
                //403
                res.redirect("/users/".concat(res.session.user._id));
              }
            }

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function editPlan(_x10, _x11) {
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
    var _req$body, title, start, end, startDate, endDate, pC_id, pC_user, pC_gmail, pC_image_url, tempDate, dayArray, check_plan, totplanidcall, totplanid, count, totplan, user_data;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body = req.body, title = _req$body.title, start = _req$body.start, end = _req$body.end;
            startDate = new Date(start);
            endDate = new Date(end);
            pC_id = req.session.user._id;
            pC_user = req.session.user.name;
            pC_gmail = req.session.user.gmail;
            pC_image_url = req.session.user.image_url;
            tempDate = new Date(startDate);
            dayArray = [];
            _context4.next = 11;
            return findtitle(title);

          case 11:
            check_plan = _context4.sent;

            if (!(check_plan == null)) {
              _context4.next = 41;
              break;
            }

            _context4.next = 15;
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
              }]
            }).save().then(function () {})["catch"](function (err) {
              //500
              console.error(err);
              res.status(500).send("<script>".concat(err, "</script>"));
            });

          case 15:
            _context4.next = 17;
            return findtitle(title);

          case 17:
            totplanidcall = _context4.sent;
            totplanid = totplanidcall._id;
            count = 0;
            tempDate;

          case 21:
            if (!(tempDate <= endDate)) {
              _context4.next = 29;
              break;
            }

            dayArray.push(new Date(tempDate));
            _context4.next = 25;
            return _TotPlan.TotPlan.findByIdAndUpdate(totplanid, {
              $push: {
                day_plan: [{
                  date: dayArray[count]
                }]
              }
            }, {
              upsert: true
            }).exec();

          case 25:
            count = count + 1;

          case 26:
            tempDate.setDate(tempDate.getDate() + 1);
            _context4.next = 21;
            break;

          case 29:
            _context4.next = 31;
            return findtitle(title);

          case 31:
            totplan = _context4.sent;
            _context4.next = 34;
            return _User.User.findByIdAndUpdate(pC_id, {
              $push: {
                totPlan_list: {
                  _id: totplan._id,
                  title: totplan.title
                }
              }
            }, {
              upsert: true
            }).exec();

          case 34:
            _context4.next = 36;
            return finduser(pC_gmail);

          case 36:
            user_data = _context4.sent;
            req.session.user = user_data;
            res.redirect("/plans/".concat(totplan._id));
            _context4.next = 42;
            break;

          case 41:
            // 406?
            res.status(406).send("<script>alert('\uAC19\uC740 \uC774\uB984\uC758 \uC5EC\uD589\uC774 \uC788\uC2B5\uB2C8\uB2E4. \uB2E4\uB978 \uC774\uB984\uC744 \uC120\uD0DD\uD574\uC8FC\uC138\uC694'); window.location.href=\"/users/".concat(pC_id, "\"</script>")); //res.redirect(`/users/${pC_id}`);

          case 42:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function postCreatePlan(_x12, _x13) {
    return _ref4.apply(this, arguments);
  };
}();

exports.postCreatePlan = postCreatePlan;

var accept = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, accept_id, par_userinfo, usertotplan, totplan_title, totplan_id, insert_plan, hostname, insert_host, par_info;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            accept_id = req.session.user._id;
            _context5.next = 4;
            return finduser(req.session.user.gmail);

          case 4:
            par_userinfo = _context5.sent;
            _context5.next = 7;
            return finduserPlan(id);

          case 7:
            usertotplan = _context5.sent;
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
              plan_id: totplan_id
            };
            par_info = {
              _id: par_userinfo._id,
              name: par_userinfo.name,
              image_url: par_userinfo.image_url
            };

            _TotPlan.TotPlan.findOne({
              _id: id
            }).exec(function (err, res) {
              if (res) {
                res.participants.push(par_info);
                res.save();
              }
            });

            _context5.next = 17;
            return _User.User.findOne({
              _id: accept_id
            }).exec(function (err, res) {
              if (res) {
                res.totPlan_list.push(insert_plan);
                res.call_list.pull(insert_host);
                res.save();
              }

              console.log(res.totPlan_list);
              req.session.user.totPlan_list = res.totPlan_list;
              console.log(req.session.user.totPlan_list);
            });

          case 17:
            res.redirect("/plans/".concat(id));

          case 18:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function accept(_x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

exports.accept = accept;

var refuse = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var id, refuse_id, usertotplan, totplan_title, totplan_id, hostname, insert_host;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            //***DB
            id = req.params.id;
            refuse_id = req.session.user._id;
            _context6.next = 4;
            return finduserPlan(id);

          case 4:
            usertotplan = _context6.sent;
            totplan_title = usertotplan.title;
            totplan_id = usertotplan._id;
            hostname = usertotplan.admin.name;
            insert_host = {
              host: hostname,
              plan_title: totplan_title,
              plan_id: totplan_id
            };

            _User.User.findOne({
              _id: refuse_id
            }).exec(function (err, res) {
              if (res) {
                res.call_list.pull(insert_host);
                res.save();
              }
            });

            res.redirect("/plans/".concat(id));

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function refuse(_x16, _x17) {
    return _ref6.apply(this, arguments);
  };
}();

exports.refuse = refuse;

var del = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var id, usertotplan, hostid, hostname, totplan_title, gmail, userinfo, usertotList, adminUser, delete_planList, delete_CallList, par_CallList, i, parArr_IDList, k, parID, delete_plan;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            //삭제할 totPlan id
            id = req.params.id;
            _context7.next = 3;
            return finduserPlan(id);

          case 3:
            usertotplan = _context7.sent;
            hostid = usertotplan.admin._id;
            hostname = usertotplan.admin.name;
            totplan_title = usertotplan.title;
            gmail = req.session.user.gmail;
            _context7.next = 10;
            return finduser(gmail);

          case 10:
            userinfo = _context7.sent;
            usertotList = userinfo.totPlan_list; // participants call_list 찾기

            adminUser = {
              _id: hostid,
              name: hostname
            }; //삭제할 planList

            delete_planList = usertotList.find(function (element) {
              return element._id == id;
            }); //삭제할 CallList

            delete_CallList = {
              host: hostname,
              plan_title: totplan_title,
              plan_id: id
            };
            _context7.next = 17;
            return findCallList(delete_CallList);

          case 17:
            par_CallList = _context7.sent;

            if (par_CallList) {
              for (i = 0; i < par_CallList.length; i++) {
                parArr_IDList = par_CallList[i]._id;

                _User.User.findOne({
                  _id: parArr_IDList
                }).exec(function (err, res) {
                  if (res) {
                    res.call_list.pull(delete_CallList);
                    res.save();
                  }
                });
              }
            }

            for (k = 0; k < usertotplan.participants.length; k++) {
              parID = usertotplan.participants[k]._id;

              _User.User.findOne({
                _id: parID
              }).exec(function (err, res) {
                if (res) {
                  res.totPlan_list.pull(delete_planList);
                  res.save();
                }
              });
            }

            _User.User.findOne({
              _id: req.session.user._id
            }).exec(function (err, res) {
              if (res) {
                res.totPlan_list.pull(delete_planList);
                res.save();
              }
            }); // Total Plan 삭제


            _context7.next = 23;
            return deletePlan(id);

          case 23:
            delete_plan = _context7.sent;
            res.redirect("/users/".concat(req.session.user._id));

          case 25:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function del(_x18, _x19) {
    return _ref7.apply(this, arguments);
  };
}();

exports.del = del;