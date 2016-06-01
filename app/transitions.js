export default function liquidFireTransitionMap() {
  this.transition(
    this.fromRoute('protected.notebooks.notebook.notes'),
    this.toRoute('protected.notebooks.notebook.activity'),
    this.use('toRight'),
    this.reverse('toLeft')
  );

  const flashInOptions = { duration: 100 };
  const flashOutOptions = { duration: 2000 };

  this.transition(
    this.hasClass('c-note-card__liquid-bind-flash-container'),
    this.toValue(false),
    // this.use('flash'),
    this.use('flash', null, flashInOptions, flashOutOptions)
  );

  this.transition(
    this.hasClass('c-note-card__liquid-revisions-number'),
    this.use('bounceUpScale', 2.5)
  );
}
