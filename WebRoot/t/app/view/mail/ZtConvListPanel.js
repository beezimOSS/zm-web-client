Ext.define('ZCS.view.mail.ZtConvListPanel', {

	extend: 'Ext.Panel',
	requires: [
		'Ext.dataview.List',
		'Ext.TitleBar',
		'Ext.field.Search',
		'ZCS.view.mail.ZtConvListView'
	],
	xtype: 'convlistpanel',

	config: {
		layout: 'fit',
		style:  'border: solid blue 1px;'
	},

	initialize: function() {

		this.callParent(arguments);

		var inbox = ZCS.common.ZtUserSession.getFolderList().getStore().getById(ZCS.common.ZtConstants.ID_INBOX),
			unread = inbox ? inbox.get('unreadCount') : 0;

		var listToolbar = {
			docked: 'top',
			xtype: 'titlebar',
			title: '<b>Inbox (' + unread + ')</b>',
			items: [
				{
					xtype: 'button',
					handler: function() {
						this.up('mailview').fireEvent('showFolders');
					},
					iconCls: 'list',
					iconMask: true,
					align: 'left'
				},
				{
					xtype: 'button',
					handler: function() {
						this.up('mailview').fireEvent('compose');
					},
					iconCls: 'compose',
					iconMask: true,
					align: 'right'
				}
			]
		};

		var searchToolbar = {
			docked: 'top',
			xtype: 'toolbar',
			items: [
				{
					xtype: 'searchfield',
					name: 'searchField',
					width: '95%',
					listeners: {
						keyup: function(fld, ev) {
							var keyCode = ev.browserEvent.keyCode;
							if (keyCode === 13 || keyCode === 3) {
								this.up('mailview').fireEvent('search', fld.getValue());
							}
						}
					}
				}
			]
		};

		var listView = {
			xtype: 'convlistview',
			store: Ext.getStore('ZtConvStore')
		}

		this.add([
			listToolbar,
			searchToolbar,
			listView
		]);
	}
});

