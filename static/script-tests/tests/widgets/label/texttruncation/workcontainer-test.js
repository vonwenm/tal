
(function() {
    this.tests = AsyncTestCase("Work Container");

    this.tests.prototype.setUp = function () {
        this.sandbox = sinon.sandbox.create();
        this.sourceText = "Donec dignissim lacus eu quam fringilla, vitae hendrerit tellus egestas. Aenean ultricies blandit tellus, ac vestibulum libero sagittis in. Integer purus tortor, placerat quis velit ac, pulvinar sodales augue. Maecenas sodales, arcu id aliquet consectetur, enim purus lacinia urna, nec sagittis sem elit a nunc. Nam sagittis molestie varius. Aliquam vehicula, nisi ut porta venenatis, diam ipsum sodales nisi, nec rhoncus lorem quam sit amet neque. Cras euismod porttitor felis, at pulvinar diam iaculis vel. Nullam tincidunt turpis sit amet nunc lacinia, a fermentum purus tincidunt. Curabitur ac elit a quam posuere fermentum in sit amet ante. Vivamus semper ligula non metus mattis, id feugiat mauris ultrices. Aliquam ullamcorper molestie metus eget laoreet. Sed gravida mi et mauris venenatis, nec ultricies lacus suscipit. Nullam placerat elit id euismod interdum. Proin et dui eget sem sodales bibendum. Nam pulvinar, libero id elementum sagittis, purus augue molestie dui, vel dapibus lorem nibh ac odio. In eu adipiscing sapien.";
        this.parentContainer = setupParentContainer();
    };

    this.tests.prototype.tearDown = function () {
        this.sandbox.restore();
        destroyParentContainer(this.parentContainer);
    };

    function setupParentContainer() {
        var container = document.createElement("div");
        // try and set the css to that this will render the same in all browsers
        container.style.display = "block";
        container.style.margin = "0";
        container.style.padding = "0";
        container.style.borderStyle = "none";
        container.style.fontFamily = "Courier, monospace";
        container.style.fontStyle = "normal";
        container.style.fontSize = "20px";
        container.style.fontWeight = "normal";
        document.body.appendChild(container);
        return container;
    }

    function destroyParentContainer(container) {
        document.body.removeChild(container);
    }

    this.tests.prototype.testCheckTextThatIsMoreThanContainersVerticalHeightWhenMeasuringVerticallyIsReportedAsOver = function (queue) {
        expectAsserts(1);

        queuedRequire(queue, ["antie/widgets/label/texttruncation/workcontainer"], function(WorkContainer) {
            var container = document.createElement("div");
            this.parentContainer.appendChild(container);
            container.style.width = "100px";
            container.style.height = "100px";
            var workContainer = new WorkContainer(container, false);
            assertEquals(true, workContainer.isOver(this.sourceText));
        });
    };

    this.tests.prototype.testCheckTextThatIsLessThanContainersHeightWhenMeasuringVerticallyIsNotReportedAsOver = function (queue) {
        expectAsserts(1);

        queuedRequire(queue, ["antie/widgets/label/texttruncation/workcontainer"], function(WorkContainer) {
            var container = document.createElement("div");
            this.parentContainer.appendChild(container);
            container.style.width = "100px";
            container.style.height = "100px";
            var workContainer = new WorkContainer(container, false);
            assertEquals(false, workContainer.isOver("Two words."));
        });
    };

    this.tests.prototype.testCheckTextThatIsMoreThanContainersWidthWhenMeasuringHorizontallyIsReportedAsOver = function (queue) {
        expectAsserts(1);

        queuedRequire(queue, ["antie/widgets/label/texttruncation/workcontainer"], function(WorkContainer) {
            var container = document.createElement("div");
            this.parentContainer.appendChild(container);
            container.style.width = "100px";
            container.style.height = "100px";
            var workContainer = new WorkContainer(container, true);
            assertEquals(true, workContainer.isOver(this.sourceText));
        });
    };

    this.tests.prototype.testCheckTextThatIsLessThanContainersWidthWhenMeasuringHorizontallyIsNotReportedAsOver = function (queue) {
        expectAsserts(1);

        queuedRequire(queue, ["antie/widgets/label/texttruncation/workcontainer"], function(WorkContainer) {
            var container = document.createElement("div");
            this.parentContainer.appendChild(container);
            container.style.width = "100px";
            container.style.height = "100px";
            var workContainer = new WorkContainer(container, true);
            assertEquals(true, workContainer.isOver("Two words."));
        });
    };

})();