# MV(Rock)*

A set of examples to show the similarities and the differences between the different meta-patterns of UI Architecture.




##MVC - Model View Controller

The Grand-Daddy of UI Architecture, it's been used, misused and abused for over 30 years.  The simple example shows how the interactions work when Observers aren't available (or too annoying, I'm looking @ you, Java).

While we can create one view beautifully with this simple Arch, we'll see that adding Observers in the next example will allow us to create multiple views of the same data.



##MVCActive - Model View Controller - Active
The original Architecture, with observers.  The original smalltalk implementation had much more fine-grained association between MV&C... each individual UI element had it's own set, and they were nested amongst each other.  I've taken liberties here to balance complexities... creating a complex-enough application without creating code thats too big to grok.

This example has two views of the same data... and while the second view doesn't modify the data, it could very easily.

When data is all we have to share between views, MVC works very well.  The View holds it's own state, hence most of the logic of reacting to the model changes lives there. 

If you need to share state (or any non-model data) amongst views, however, things can get pretty hairy.



##MVP - Model View Presenter

Model View Presenter evolved as applications became larger, and testing became more important, and more difficult.  The basic premise is to pull as much logic into classes that are abstracted out from the View, making it possible to instantiate and test these classes without user interaction.

Indeed, MVP is usually the easiest architecture to test, though it requires some more advanced test patterns to do correctly, such as Mocks and Spies.

The heart of MVP is the Presenter, which Fowler calls the Supervising Controller.  This class is given complete access to a view that is generally very passive... it's been created declaratively, responds to data binding, but nothing else.  The Controller responds to user input, and can change the UI components however it needs to.

One of the downsides to the MVP pattern is the amount of files needed in strong/static-typed systems (though the strong testability of strong/static languages means that these two are often found together).  For instance, in Java, an Interface must be created for every UI component that the Controller interfaces with, so that the component can be mocked up during testing. Stubs are then often created from the Interfaces to allow for easy testing of common user flows.

The example here shows how we can use our Presenter to reach down into a sectiondary view's sub-components and adjust colors and styles based on actions taken in the main view. This allows for some fantastic user experiences, though it can greatly increase the complexity of the code.  Though if testing exists, the complexity could be considered mitigated.



##MVVM - Model View ViewModel
(Or, as I learned, Model View Presentation Model)



# References
Of course, [Martin Fowler](http://martinfowler.com/) was a main resource, and while I have eight tabs open to his site as I write this, his page [detailing UI Architectures](http://martinfowler.com/eaaDev/uiArchs.html) served as the foundation that I built this on

[Jesse Warden](http://jessewarden.com/)'s intro on his [article describing Backbone for Flex devs](http://jessewarden.com/2012/08/backbone-js-for-flash-and-flex-developers.html) was my Eureka! moment.

[Jeremy Miller](http://jeremydmiller.com/) spent time going through these [patterns for WinForms](http://codebetter.com/jeremymiller/2007/07/26/the-build-your-own-cab-series-table-of-contents/). 

[Steven Sanderson] wrote a great comparison of [seven popular JavaScript Frameworks](http://blog.stevensanderson.com/2012/08/01/rich-javascript-applications-the-seven-frameworks-throne-of-js-2012/). 

[MVC vs MVP Chapter of his online book](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#detailmvcmvp)