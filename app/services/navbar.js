import Ember from 'ember';

const {
  Service,
  A,
  Object: EmberObject,
  computed: { uniqBy }
} = Ember;

const NavLink = EmberObject.extend({
  routeName: null,
  title: null
});


export default Service.extend({
  navLinks: A(),

  activeNavLinks: uniqBy('navLinks', 'routeName'),
  isNavbarVisible: true,


  addNavLink(routeName, title) {
    this.get('navLinks').addObject(NavLink.create({ routeName, title }));
  },

  removeNavLink(routeName) {
    this.get('navLinks').removeObjects(
      this.get('navLinks').filter(link => link.get('routeName') === routeName)
    );
  }
});
