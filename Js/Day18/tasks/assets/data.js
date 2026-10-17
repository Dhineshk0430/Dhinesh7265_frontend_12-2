const createCounter = () => {
    let count = 0;

    return () => {
        count += 10;
        console.log(count);
    };
};

const counter = createCounter();

counter();
counter();
counter();
counter();
counter();