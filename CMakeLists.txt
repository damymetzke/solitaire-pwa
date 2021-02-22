cmake_minimum_required(VERSION 3.16)

project(Solitaire)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)

file(GLOB_RECURSE source_files
            "src/cpp/solitaire/*.h"
            "src/cpp/solitaire/*.cpp"
    )

file(GLOB_RECURSE test_files
            "test/cpp/unit/*.cpp"
    )

add_library(Solitaire ${source_files})

add_subdirectory(vendor/googletest)

if(NOT EMSCRIPTEN EQUAL 1)

    add_executable(Solitaire_test ${test_files})
    add_test(NAME Solitaire_test COMMAND Solitaire_test)
    target_link_libraries(Solitaire_test PUBLIC Solitaire gtest)

endif()