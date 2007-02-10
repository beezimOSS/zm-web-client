/*
 * ***** BEGIN LICENSE BLOCK *****
 * Version: ZPL 1.2
 *
 * The contents of this file are subject to the Zimbra Public License
 * Version 1.2 ("License"); you may not use this file except in
 * compliance with the License. You may obtain a copy of the License at
 * http://www.zimbra.com/license
 *
 * Software distributed under the License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See
 * the License for the specific language governing rights and limitations
 * under the License.
 *
 * The Original Code is: Zimbra Collaboration Suite Web Client
 *
 * The Initial Developer of the Original Code is Zimbra, Inc.
 * Portions created by Zimbra are Copyright (C) 2007 Zimbra, Inc.
 * All Rights Reserved.
 *
 * Contributor(s):
 *
 * ***** END LICENSE BLOCK *****
 */

function ZmPortalView(parent, appCtxt, controller, dropTgt) {
	var headerList = this._getHeaderList(appCtxt);
	ZmListView.call(this,
        parent, "ZmPortalView", Dwt.ABSOLUTE_STYLE,
        ZmController.PORTAL_VIEW, null, controller, headerList, dropTgt
    );

	this._appCtxt = appCtxt;
	this._controller = controller;

    // load the portal manifest
    var portal = appCtxt.get(ZmSetting.PORTAL_NAME);
    if (portal) {
        var url = [ "/zimbra/portals/",portal,"/manifest.js" ].join("");
        var req = AjxLoader.load(url);
        AjxPackage.eval(req.responseText || "");

        // generate layout
        var cols = window.Portal && window.Portal.cols;
        if (cols) {
            var templateId = "zimbraMail.portal.templates.Portal#layout";
            var data = { cols: cols, spacing: 4 };
            this.getHtmlElement().innerHTML = AjxTemplate.expand(templateId, data);

            // populate portlets
            for (var i = 0; i < cols.length; i++) {
                var col = cols[i];
                var portlets = col.portlets || [];
                for (var j = 0; j < portlets.length; j++) {
                    var portlet = portlets[j];

                    var id = [ "Portal", i, j ].join("_");
                    var contEl = document.getElementById(id);
                    var templateId = "zimbraMail.portal.templates.Portal#border";
                    contEl.innerHTML = AjxTemplate.expand(templateId, id);

                    var titleEl = document.getElementById(id+"_header_title");
                    titleEl.innerHTML = "Title";
                    var contentEl = document.getElementById(id+"_content");
                    contentEl.innerHTML = "Content";
                }
            }
        }
    }
}
ZmPortalView.prototype = new ZmListView;
ZmPortalView.prototype.constructor = ZmPortalView;

ZmPortalView.prototype.toString = function() {
	return "ZmPortalView";
};

//
// Protected methods
//

ZmPortalView.prototype._getHeaderList = function() {
    return [];
};
