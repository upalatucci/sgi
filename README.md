### Enrivonment Setup

 - Follow the react native guide described [here](https://reactnative.dev/docs/environment-setup) ( select the React Native CLI QuickStart tab)

 - Install Yarn, the node package manager (replacing npm), from [here](https://classic.yarnpkg.com/en/docs/install/)

 - Install the repo dependecies running into the repo directory the following command...

```sh
  yarn install
```


### Development

- Launch the server:

```sh
  yarn start
```

- Build the device if is necessary.

  For android

  ```sh
    yarn android
  ```

  For ios

  ```sh
    yarn ios
  ```

### Production

For ios:
  Open the file ios/SGIItalia.xcworkspace with Xcode and build the project using it

For android:
  To obtain an apk
  ```sh
    yarn android -- --variant=release
  ```
  The apk will be generated in android/app/build/outputs/apk/release

  To obtain an .aab file
  ```sh
    cd android
    cd ./gradlew bundleRelease
  ``` 
  The .aab file will be generated in android/app/build/outputs/bundle/release


