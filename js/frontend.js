;
var MonsterInsights = function() {
        var t = [];
        this.setLastClicked = function(e, n, i) {
            e = typeof e !== 'undefined' ? e : [];
            n = typeof n !== 'undefined' ? n : [];
            i = typeof i !== 'undefined' ? i : !1;
            t.valuesArray = e;
            t.fieldsArray = n
        };
        this.getLastClicked = function() {
            return t
        };

        function l() {
            if (monsterinsights_frontend.is_debug_mode === 'true' || window.monsterinsights_debug_mode) {
                return !0
            } else {
                return !1
            }
        };

        function e(e, n) {
            e = typeof e !== 'undefined' ? e : [];
            n = typeof n !== 'undefined' ? n : {};
            __gaTracker('send', n);
            t.valuesArray = e;
            t.fieldsArray = n;
            t.tracked = !0;
            i('Tracked: ' + e.type);
            i(t)
        };

        function n(e) {
            e = typeof e !== 'undefined' ? e : [];
            t.valuesArray = e;
            t.fieldsArray = [];
            t.tracked = !1;
            i('Not Tracked: ' + e.exit);
            i(t)
        };

        function i(e) {
            if (l()) {
                console.dir(e)
            }
        };

        function a(e) {
            return e.replace(/^\s+|\s+$/gm, '')
        };

        function s() {
            var n = 0,
                e = document.domain,
                i = e.split('.'),
                t = '_gd' + (new Date()).getTime();
            while (n < (i.length - 1) && document.cookie.indexOf(t + '=' + t) == -1) {
                e = i.slice(-1 - (++n)).join('.');
                document.cookie = t + '=' + t + ';domain=' + e + ';'
            };
            document.cookie = t + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=' + e + ';';
            return e
        };

        function f(e) {
            e = e.toString();
            e = e.substring(0, (e.indexOf('#') == -1) ? e.length : e.indexOf('#'));
            e = e.substring(0, (e.indexOf('?') == -1) ? e.length : e.indexOf('?'));
            e = e.substring(e.lastIndexOf('/') + 1, e.length);
            if (e.length > 0 && e.indexOf('.') !== -1) {
                e = e.substring(e.indexOf('.') + 1);
                return e
            } else {
                return ''
            }
        };

        function h() {
            return typeof(__gaTracker) !== 'undefined' && __gaTracker && __gaTracker.hasOwnProperty('loaded') && __gaTracker.loaded == !0
        };

        function p(e) {
            return e.which == 1 || e.which == 2 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey
        };

        function d() {
            var e = [];
            if (typeof monsterinsights_frontend.download_extensions == 'string') {
                e = monsterinsights_frontend.download_extensions.split(',')
            };
            return e
        };

        function u() {
            var e = [];
            if (typeof monsterinsights_frontend.inbound_paths == 'string') {
                e = monsterinsights_frontend.inbound_paths.split(',')
            };
            return e
        };

        function v(e) {
            if (e.which == 1) {
                return 'event.which=1'
            } else if (e.which == 2) {
                return 'event.which=2'
            } else if (e.metaKey) {
                return 'metaKey'
            } else if (e.ctrlKey) {
                return 'ctrlKey'
            } else if (e.shiftKey) {
                return 'shiftKey'
            } else if (e.altKey) {
                return 'altKey'
            } else {
                return ''
            }
        };

        function m(e) {
            var r = d(),
                h = u(),
                t = 'unknown',
                c = e.href,
                g = f(e.href),
                p = s(),
                o = e.hostname,
                i = e.protocol,
                v = e.pathname;
            c = c.toString();
            var n, l;
            if (c.match(/^javascript\:/i)) {
                t = 'internal'
            } else if (i && i.length > 0 && (a(i) == 'tel' || a(i) == 'tel:')) {
                t = 'tel'
            } else if (i && i.length > 0 && (a(i) == 'mailto' || a(i) == 'mailto:')) {
                t = 'mailto'
            } else if (o && p && o.length > 0 && p.length > 0 && !o.endsWith(p)) {
                t = 'external'
            } else if (v && h.length > 0 && v.length > 0) {
                for (n = 0, l = h.length; n < l; ++n) {
                    if (h[n].length > 0 && v.startsWith(h[n])) {
                        t = 'internal-as-outbound';
                        break
                    }
                }
            } else if (o && window.monsterinsights_experimental_mode && o.length > 0 && document.domain.length > 0 && o !== document.domain) {
                t = 'cross-hostname'
            };
            if (g && (t === 'unknown' || 'external' === t) && r.length > 0 && g.length > 0) {
                for (n = 0, l = r.length; n < l; ++n) {
                    if (r[n].length > 0 && (c.endsWith(r[n]) || r[n] == g)) {
                        t = 'download';
                        break
                    }
                }
            };
            if (t === 'unknown') {
                t = 'internal'
            };
            return t
        };

        function y(e, t) {
            var n = (e.target && !e.target.match(/^_(self|parent|top)$/i)) ? e.target : !1;
            if (t.ctrlKey || t.shiftKey || t.metaKey || t.which == 2) {
                n = '_blank'
            };
            return n
        };

        function c(i) {
            var a = i.srcElement || i.target,
                t = [],
                o;
            t.el = a;
            t.ga_loaded = h();
            t.click_type = v(i);
            if (!h() || !p(i)) {
                t.exit = 'loaded';
                n(t);
                return
            }
            while (a && (typeof a.tagName == 'undefined' || a.tagName.toLowerCase() != 'a' || !a.href)) {
                a = a.parentNode
            };
            if (a && a.href && !a.hasAttribute('xlink:href')) {
                var c = a.href,
                    L = f(a.href),
                    K = d(),
                    O = u(),
                    E = monsterinsights_frontend.home_url,
                    w = monsterinsights_frontend.track_download_as,
                    b = 'outbound-link-' + monsterinsights_frontend.internal_label,
                    D = s(),
                    r = m(a),
                    x = y(a, i);
                t.el = a;
                t.el_href = a.href;
                t.el_protocol = a.protocol;
                t.el_hostname = a.hostname;
                t.el_port = a.port;
                t.el_pathname = a.pathname;
                t.el_search = a.search;
                t.el_hash = a.hash;
                t.el_host = a.host;
                t.debug_mode = l();
                t.download_extensions = K;
                t.inbound_paths = O;
                t.home_url = E;
                t.track_download_as = w;
                t.internal_label = b;
                t.link = c;
                t.extension = L;
                t.type = r;
                t.target = x;
                t.title = a.title || a.textContent || a.innerText;
                if (r !== 'internal' && r !== 'javascript') {
                    var k = !1,
                        g = function() {
                            if (k) {
                                return
                            };
                            k = !0;
                            window.location.href = c
                        },
                        T = function() {
                            t.exit = 'external';
                            n(t)
                        },
                        A = function() {
                            t.exit = 'internal-as-outbound';
                            n(t)
                        },
                        C = function() {
                            t.exit = 'cross-hostname';
                            n(t)
                        };
                    if (x || r == 'mailto' || r == 'tel') {
                        if (r == 'download') {
                            if (w == 'pageview') {
                                o = {
                                    hitType: 'pageview',
                                    page: c,
                                };
                                e(t, o)
                            } else {
                                o = {
                                    hitType: 'event',
                                    eventCategory: 'download',
                                    eventAction: c,
                                    eventLabel: t.title,
                                };
                                e(t, o)
                            }
                        } else if (r == 'tel') {
                            o = {
                                hitType: 'event',
                                eventCategory: 'tel',
                                eventAction: c,
                                eventLabel: t.title.replace('tel:', ''),
                            };
                            e(t, o)
                        } else if (r == 'mailto') {
                            o = {
                                hitType: 'event',
                                eventCategory: 'mailto',
                                eventAction: c,
                                eventLabel: t.title.replace('mailto:', ''),
                            };
                            e(t, o)
                        } else if (r == 'internal-as-outbound') {
                            o = {
                                hitType: 'event',
                                eventCategory: b,
                                eventAction: c,
                                eventLabel: t.title,
                            };
                            e(t, o)
                        } else if (r == 'external') {
                            o = {
                                hitType: 'event',
                                eventCategory: 'outbound-link',
                                eventAction: c,
                                eventLabel: t.title,
                            };
                            e(t, o)
                        } else if (r == 'cross-hostname') {
                            o = {
                                hitType: 'event',
                                eventCategory: 'cross-hostname',
                                eventAction: c,
                                eventLabel: t.title,
                            };
                            e(t, o)
                        } else {
                            t.exit = 'type';
                            n(t)
                        }
                    } else {
                        if (r != 'cross-hostname' && r != 'external' && r != 'internal-as-outbound') {
                            if (!i.defaultPrevented) {
                                if (i.preventDefault) {
                                    i.preventDefault()
                                } else {
                                    i.returnValue = !1
                                }
                            }
                        };
                        if (r == 'download') {
                            if (w == 'pageview') {
                                o = {
                                    hitType: 'pageview',
                                    page: c,
                                    hitCallback: g,
                                };
                                e(t, o)
                            } else {
                                o = {
                                    hitType: 'event',
                                    eventCategory: 'download',
                                    eventAction: c,
                                    eventLabel: t.title,
                                    hitCallback: g,
                                };
                                e(t, o)
                            }
                        } else if (r == 'internal-as-outbound') {
                            window.onbeforeunload = function(n) {
                                if (!i.defaultPrevented) {
                                    if (i.preventDefault) {
                                        i.preventDefault()
                                    } else {
                                        i.returnValue = !1
                                    }
                                };
                                o = {
                                    hitType: 'event',
                                    eventCategory: b,
                                    eventAction: c,
                                    eventLabel: t.title,
                                    hitCallback: g,
                                };
                                if (navigator.sendBeacon) {
                                    o.transport = 'beacon'
                                };
                                e(t, o);
                                setTimeout(g, 1000)
                            }
                        } else if (r == 'external') {
                            window.onbeforeunload = function(n) {
                                if (!i.defaultPrevented) {
                                    if (i.preventDefault) {
                                        i.preventDefault()
                                    } else {
                                        i.returnValue = !1
                                    }
                                };
                                o = {
                                    hitType: 'event',
                                    eventCategory: 'outbound-link',
                                    eventAction: c,
                                    eventLabel: t.title,
                                    hitCallback: g,
                                };
                                if (navigator.sendBeacon) {
                                    o.transport = 'beacon'
                                };
                                e(t, o);
                                setTimeout(g, 1000)
                            }
                        } else if (r == 'cross-hostname') {
                            window.onbeforeunload = function(n) {
                                if (!i.defaultPrevented) {
                                    if (i.preventDefault) {
                                        i.preventDefault()
                                    } else {
                                        i.returnValue = !1
                                    }
                                };
                                o = {
                                    hitType: 'event',
                                    eventCategory: 'cross-hostname',
                                    eventAction: c,
                                    eventLabel: t.title,
                                    hitCallback: g,
                                };
                                if (navigator.sendBeacon) {
                                    o.transport = 'beacon'
                                };
                                e(t, o);
                                setTimeout(g, 1000)
                            }
                        } else {
                            t.exit = 'type';
                            n(t)
                        };
                        if (r != 'external' && r != 'cross-hostname' && r != 'internal-as-outbound') {
                            setTimeout(g, 1000)
                        } else {
                            if (r == 'external') {
                                setTimeout(T, 1100)
                            } else if (r == 'cross-hostname') {
                                setTimeout(C, 1100)
                            } else {
                                setTimeout(A, 1100)
                            }
                        }
                    }
                } else {
                    t.exit = 'internal';
                    n(t)
                }
            } else {
                t.exit = 'notlink';
                n(t)
            }
        };
        var r = window.location.hash;

        function g() {
            if (monsterinsights_frontend.hash_tracking === 'true' && r != window.location.hash) {
                r = window.location.hash;
                __gaTracker('set', 'page', location.pathname + location.search + location.hash);
                __gaTracker('send', 'pageview');
                i('Hash change to: ' + location.pathname + location.search + location.hash)
            } else {
                i('Hash change to (untracked): ' + location.pathname + location.search + location.hash)
            }
        };
        var o = window;
        if (o.addEventListener) {
            o.addEventListener('load', function() {
                document.body.addEventListener('click', c, !1)
            }, !1);
            window.addEventListener('hashchange', g, !1)
        } else {
            if (o.attachEvent) {
                o.attachEvent('onload', function() {
                    document.body.attachEvent('onclick', c)
                });
                window.attachEvent('onhashchange', g)
            }
        };
        if (typeof String.prototype.endsWith !== 'function') {
            String.prototype.endsWith = function(e) {
                return this.indexOf(e, this.length - e.length) !== -1
            }
        };
        if (typeof String.prototype.startsWith !== 'function') {
            String.prototype.startsWith = function(e) {
                return this.indexOf(e) === 0
            }
        };
        if (typeof Array.prototype.lastIndexOf !== 'function') {
            Array.prototype.lastIndexOf = function(e) {
                'use strict';
                if (this === void 0 || this === null) {
                    throw new TypeError()
                };
                var t, n, o = Object(this),
                    i = o.length >>> 0;
                if (i === 0) {
                    return -1
                };
                t = i - 1;
                if (arguments.length > 1) {
                    t = Number(arguments[1]);
                    if (t != t) {
                        t = 0
                    } else if (t != 0 && t != (1 / 0) && t != -(1 / 0)) {
                        t = (t > 0 || -1) * Math.floor(Math.abs(t))
                    }
                };
                for (n = t >= 0 ? Math.min(t, i - 1) : i - Math.abs(t); n >= 0; n--) {
                    if (n in o && o[n] === e) {
                        return n
                    }
                };
                return -1
            }
        }
    },
    MonsterInsightsObject = new MonsterInsights();